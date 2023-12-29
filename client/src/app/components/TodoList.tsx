'use client';

import { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

import getTodoCollection from '@/app/api/getTodoCollections';

import { TodosContext } from '@/app/context/TodosContextProvider';

import TodoItem from '@/app/components/TodoItem';
import TodoItemInput from '@/app/components/TodoItemInput';
import ActivityPanel from '@/app/components/ActivityPanel';
import TodoCollectionList from './TodoCollectionList';

export default function TodoList() {
  const { data: session } = useSession();
  const { currentTodoCollectionID, setCurrentTodoCollectionID } =
    useContext(TodosContext);

  const [show, setShow] = useState({
    all: true,
    active: false,
    completed: false,
  });

  const {
    error: loadingError,
    data: todoCollections,
    isLoading: areTodosLoading,
  } = useQuery({
    queryKey: ['todo-collections'],
    // @ts-ignore
    queryFn: () => getTodoCollection(session?.user?.id),
    // @ts-ignore
    enabled: !!session?.user?.id,
  });

  useEffect(() => {
    if (todoCollections && todoCollections.length > 0) {
      setCurrentTodoCollectionID(todoCollections[0]._id);
    }
  }, [todoCollections]);

  const currentTodoCollectionItems =
    todoCollections &&
    todoCollections?.filter(
      (collection) => collection?._id === currentTodoCollectionID
    );

  const allToDos = currentTodoCollectionItems?.map(
    (collection) =>
      collection.todos?.map((todo, index) => (
        <TodoItem key={todo?._id} todo={todo} index={index} />
      ))
  );

  const otherToDos = (isActive: boolean) =>
    currentTodoCollectionItems?.map(
      (collection) =>
        collection?.todos
          ?.filter((todo) => (isActive ? !todo?.completed : todo?.completed))
          ?.map((todo, index) => (
            <TodoItem key={todo?._id} todo={todo} index={index} />
          ))
    );

  const todosCount = todoCollections?.find(
    (collection) => collection?._id === currentTodoCollectionID
  )?.todos?.length;

  const formatName = (name: string, fontSize = 'text-7xl') =>
    name.split('').map((letter, idx) => (
      <li
        key={letter + idx}
        className={`text-center font-bold leading-none uppercase text-primary dark:text-secondary ${fontSize}`}
      >
        {letter}
      </li>
    ));

  if (loadingError) {
    return (
      <div className="text-primary dark:text-secondary">
        Error loading todo collections
      </div>
    );
  }

  if (areTodosLoading)
    return (
      <div className="mt-4 shadow-2xl shadow-black/20 md:mt-6">
        <ul className="flex-wrap flex items-center w-full justify-between gap-1">
          {formatName('Loading...', 'text-3xl')}
        </ul>
      </div>
    );

  return (
    <div className="mt-2 mb-32">
      <div className="text-2xl dark:text-tertiary text-primary">
        {!todoCollections?.length ? (
          <div className="flex items-center justify-center w-full h-full">
            <h2 className="text-base">You haven't created any folders yet</h2>
          </div>
        ) : (
          <ul className="flex-wrap flex items-center w-full justify-between gap-1">
            {formatName('Collections', 'text-3xl')}
          </ul>
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
