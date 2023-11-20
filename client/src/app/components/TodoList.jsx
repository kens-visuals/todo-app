'use client';

import { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import getTodoCollection from '@/app/api/getTodoCollections';
import deleteTodoCollection from '@/app/api/delecteTodoCollection';

import { TodosContext } from '@/app/context/TodosContext';

import TodoItem from '@/app/components/TodoItem';
import TodoItemInput from '@/app/components/TodoItemInput';
import ActivityPanel from '@/app/components/ActivityPanel';

export default function TodoList() {
  const { data: session } = useSession();

  const queryClient = useQueryClient();

  const { currentTodoCollectionID, setCurrentTodoCollectionID } =
    useContext(TodosContext);

  const [show, setShow] = useState([
    { all: true, active: false, completed: false },
  ]);

  const { data: todoCollections, isLoading: areTodosLoading } = useQuery({
    queryKey: ['todo-collections'],
    queryFn: () => getTodoCollection(session?.user?.id),
    enabled: !!session?.user?.id,
  });

  const {
    mutate: removeTodoCollectionMutation,
    isLoading: isRemoveTodoCollectionMutationLoading,
  } = useMutation({
    queryKey: ['todo-collections'],
    mutationFn: (id) => deleteTodoCollection(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['todo-collections']);
      setCurrentTodoCollectionID(todoCollections?.at(1)?._id);
    },
  });

  const getTodoCollectionsList = () => {
    return todoCollections?.map((collection) => (
      <li
        key={collection?._id}
        onClick={() => setCurrentTodoCollectionID(collection?._id)}
        className={`h-32 w-full hover:cursor-pointer min-w-[20rem] snap-start rounded-md px-4 py-4 text-white hover:bg-dark-text-tertiary ${
          currentTodoCollectionID === collection?._id
            ? 'bg-dark-text-tertiary'
            : 'bg-dark-bg-primary'
        }`}
      >
        <div className="flex h-full w-full flex-col items-center justify-between">
          {isRemoveTodoCollectionMutationLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="flex w-full items-start justify-between">
                <span>{collection.title}</span>

                <button
                  type="button"
                  disabled={isRemoveTodoCollectionMutationLoading}
                  onClick={() => removeTodoCollectionMutation(collection?._id)}
                >
                  <svg
                    className="w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                  >
                    <path
                      fill="#494C6B"
                      fillRule="evenodd"
                      d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex w-full items-end justify-between">
                <span>Tasks' count: {collection?.todos?.length}</span>
              </div>
            </>
          )}
        </div>
      </li>
    ));
  };

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
        <p className="mt-10 text-4xl text-white">Loading...</p>;
      </div>
    );

  return (
    <div className="mt-4 md:mt-6">
      <div className="mt-10 mb-2 text-2xl  text-dark-text-primary">
        {!todoCollections?.length ? (
          <div className="flex items-center justify-center w-full h-full">
            <h2>You haven't created any folders yet</h2>
          </div>
        ) : (
          <h2 className="uppercase">Todo Folders</h2>
        )}
      </div>

      <ul className="no-scrollbar flex max-w-[34rem] snap-x snap-mandatory gap-4 overflow-x-auto pb-4 shadow-2xl shadow-black/20">
        {getTodoCollectionsList()}
      </ul>

      {!!todoCollections?.length && (
        <>
          <TodoItemInput />

          <h3 className="mb-1 text-lg uppercase text-dark-text-primary">
            Tasks
          </h3>
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
