'use client';

import { useContext, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

import getTodoCollection from '@/app/api/getTodoCollections';

import { TodosContext } from '@/app/context/TodosContext';

import TodoItem from '@/app/components/TodoItem';
import TodoItemInput from '@/app/components/TodoItemInput';
import ActivityPanel from '@/app/components/ActivityPanel';
import TodoCollectionList from './TodoCollectionList';

export default function TodoList() {
  const { data: session } = useSession();
  const { currentTodoCollectionID } = useContext(TodosContext);

  const [show, setShow] = useState([
    { all: true, active: false, completed: false },
  ]);

  const { data: todoCollections, isLoading: areTodosLoading } = useQuery({
    queryKey: ['todo-collections'],
    queryFn: () => getTodoCollection(session?.user?.id),
    enabled: !!session?.user?.id,
  });

  const currentTodoCollectionItems =
    todoCollections &&
    todoCollections?.filter(
      (collection) => collection?._id === currentTodoCollectionID
    );

  const allToDos = currentTodoCollectionItems?.map((collection) =>
    collection.todos?.map((todo, index) => (
      <TodoItem key={todo?._id} todo={todo} index={index} />
    ))
  );

  const otherToDos = (isActive) =>
    currentTodoCollectionItems?.map((collection) =>
      collection?.todos
        ?.filter((todo) => (isActive ? !todo?.completed : todo?.completed))
        ?.map((todo, index) => (
          <TodoItem key={todo?._id} todo={todo} index={index} />
        ))
    );

  if (areTodosLoading)
    return (
      <div className="mt-4 shadow-2xl shadow-black/20 md:mt-6">
        <p className="text-4xl text-white">Loading...</p>;
      </div>
    );

  const formatName = (name, fontSize = 'text-7xl') =>
    name
      .split('')
      .map((letter) => (
        <li
          className={`text-center font-bold leading-none uppercase text-primary dark:text-secondary ${fontSize}`}
        >
          {letter}
        </li>
      ));

  const todosCount = todoCollections.find(
    (collection) => collection?._id === currentTodoCollectionID
  )?.todos?.length;

  return (
    <div className="mt-2">
      <div className="text-2xl  text-dark-text-primary">
        {!todoCollections?.length ? (
          <div className="flex items-center justify-center w-full h-full">
            <h2>You haven't created any folders yet</h2>
          </div>
        ) : (
          <>
            <ul className="flex-wrap flex items-center w-full justify-between gap-1">
              {formatName('Collections', 'text-3xl')}
            </ul>
          </>
        )}
      </div>

      <TodoCollectionList todoCollections={todoCollections} />

      {!!todoCollections?.length && (
        <>
          <TodoItemInput />

          <ul className="flex-wrap flex items-center w-full justify-start gap-4 my-4">
            {formatName(`Tasks ${todosCount}`, 'text-2xl')}
          </ul>

          <ul className="w-full">
            {show.active
              ? otherToDos(true)
              : show?.completed
                ? otherToDos(false)
                : allToDos}
          </ul>
        </>
      )}

      {currentTodoCollectionItems?.map(
        (collection) =>
          collection?.todos?.length > 0 && (
            <ActivityPanel
              show={show}
              setShow={setShow}
              key={collection?._id}
              todos={collection?.todos}
            />
          )
      )}
    </div>
  );
}
