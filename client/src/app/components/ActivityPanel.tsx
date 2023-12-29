'use client';

import { Dispatch, SetStateAction, useContext } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import clearCompletedTodos from '@/app/api/clearCompletedTodos';

import { TodosContext } from '@/app/context/TodosContextProvider';

import { Todo } from '../types';

type ActivityPanelProps = {
  todos: Todo[];
  show: { [key: string]: boolean };
  setShow: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
};

export default function ActivityPanel({
  todos,
  show,
  setShow,
}: ActivityPanelProps) {
  const queryClient = useQueryClient();

  const { currentTodoCollectionID } = useContext(TodosContext);

  const sections = ['all', 'active', 'completed'];

  const {
    mutate: clearCompletedMutation,
    isPending: isClearCompletedMutationLoading,
  } = useMutation({
    mutationFn: (id: string) => clearCompletedTodos(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo-collections'] });
      setShow({ all: true, active: false, completed: false });
    },
  });

  const countOfCompletedTodos = todos?.filter((todo) => !todo?.completed)
    .length;

  const sectionsButtons = sections.map((section, index) => (
    <button
      key={index}
      type="button"
      onClick={() => setShow({ [section]: true })}
      className={`text-xs font-bold md:text-sm hover:text-tertiary hover:dark:text-secondary 
        ${
          show[section]
            ? 'text-yellow dark:text-dark-green'
            : 'text-secondary dark:text-primary/50'
        }`}
    >
      {section.replace(/^\w/, (c) => c.toUpperCase())}
    </button>
  ));

  return (
    <>
      <div className="flex w-full items-center justify-between rounded-b-md bg-primary py-3 px-4 dark:bg-secondary md:py-4 md:px-6 ">
        <span className="text-xs dark:text-primary text-tertiary md:text-sm">
          {countOfCompletedTodos <= 1
            ? `${countOfCompletedTodos} item left`
            : `${countOfCompletedTodos} items left`}
        </span>

        <div className="hidden space-x-4 md:inline-block">
          {sectionsButtons}
        </div>

        <button
          type="button"
          disabled={isClearCompletedMutationLoading}
          onClick={() => clearCompletedMutation(currentTodoCollectionID)}
          className="text-xs dark:text-primary text-tertiary md:text-sm hover:text-yellow dark:hover:text-green "
        >
          Clear Completed
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center space-x-4 rounded-md bg-primary py-3 px-4 dark:bg-secondary md:hidden">
        {sectionsButtons}
      </div>
    </>
  );
}
