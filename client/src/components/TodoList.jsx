import { useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import getTodoCollection from '../api/getTodoCollections';
import deleteTodoCollection from '../api/delecteTodoCollection';

import { TodosContext } from '../context/TodosContext';

import TodoItem from './TodoItem';
import ActivityPanel from './ActivityPanel';

import crossIcon from '../images/icon-cross.svg';
import TodoItemInput from './TodoItemInput';

export default function TodoList() {
  const queryClient = useQueryClient();

  const { currentTodoCollectionID, setCurrentTodoCollectionID } =
    useContext(TodosContext);

  const [show, setShow] = useState([
    { all: true, active: false, completed: false },
  ]);

  const { data: todoCollections, isLoading: areTodosLoading } = useQuery({
    queryKey: ['todo-collections'],
    queryFn: getTodoCollection,
    onSuccess: (data) => {
      // setCurrentTodoCollectionID(data?.at(0)?._id);
    },
  });

  const {
    mutate: removeTodoCollectionMutation,
    isLoading: isRemoveTodoCollectionMutationLoading,
  } = useMutation({
    queryKey: ['todo-collections'],
    mutationFn: (id) => deleteTodoCollection(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['todo-collections']);
      setCurrentTodoCollectionID(data[0]?._id);
    },
  });

  const getTodoCollectionsList = () => {
    return todoCollections?.map((collection) => (
      <li
        key={collection?._id}
        className={`h-32 w-full min-w-[20rem] snap-start rounded-md px-4 py-4 text-white hover:bg-dark-text-tertiary ${
          currentTodoCollectionID === collection?._id
            ? 'bg-dark-text-tertiary'
            : 'bg-dark-bg-primary'
        }`}
      >
        <button
          type="button"
          className="flex h-full w-full flex-col items-center justify-between"
          onClick={() => setCurrentTodoCollectionID(collection?._id)}
        >
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
                  <img
                    src={crossIcon}
                    alt="cross"
                    aria-hidden
                    className="w-4"
                  />
                </button>
              </div>

              <div className="flex w-full items-end justify-between">
                <span>Todo's count: {collection?.todos?.length}</span>
              </div>
            </>
          )}
        </button>
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
    <div className="mt-4 shadow-2xl shadow-black/20 md:mt-6">
      <ul className="no-scrollbar mt-10 flex max-w-[34rem] snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
        {getTodoCollectionsList()}
      </ul>

      <TodoItemInput />

      <ul className="w-full">
        {show.active
          ? otherToDos(true)
          : show?.completed
          ? otherToDos(false)
          : allToDos}
      </ul>

      {currentTodoCollectionItems?.map(
        (collection) =>
          collection?.todos?.length > 0 && (
            <ActivityPanel
              key={collection?._id}
              show={show}
              setShow={setShow}
              todos={collection?.todos}
            />
          )
      )}
    </div>
  );
}
