import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../config/supabaseClient.ts";

export type Todo = { id: number; title: string; completed: boolean };

async function fetchTodos(): Promise<Todo[]> {
    const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("id", { ascending: false });
    if (error) throw error;
    return data as Todo[];
}

async function addTodo(title: string, shouldFail?: boolean): Promise<Todo> {
    // Fail api call
    if (shouldFail) {
        const { error } = await supabase
            .from("todos_wrong")
            .insert([{ title, completed: false }]);
        throw error || new Error("Forced API failure");
    }

    const { data, error } = await supabase
        .from("todos")
        .insert([{ title, completed: false }])
        .select()
        .single();

    if (error) throw error;
    return data as Todo;
}

export function useTodos() {
    const qc = useQueryClient();

    const query = useQuery<Todo[]>({
        queryKey: ["todos"],
        queryFn: fetchTodos,
        staleTime: 15000,
    });

    const mutation = useMutation({
        mutationFn: ({ title, shouldFail }: { title: string; shouldFail?: boolean }) =>
            addTodo(title, shouldFail),

        onMutate: async ({ title }) => {
            await qc.cancelQueries({ queryKey: ["todos"] });

            const prevTodos = qc.getQueryData<Todo[]>(["todos"]);

            const optimisticTodo: Todo = {
                id: Date.now(),
                title,
                completed: false,
            };

            qc.setQueryData<Todo[]>(["todos"], (old) =>
                old ? [optimisticTodo, ...old] : [optimisticTodo]
            );

            return { prevTodos, optimisticId: optimisticTodo.id };
        },

        onError: (_err, _newTodo, ctx) => {
            if (ctx?.prevTodos) {
                qc.setQueryData(["todos"], ctx.prevTodos);
            }
        },

        onSuccess: (newTodo, _vars, ctx) => {
            qc.setQueryData<Todo[]>(["todos"], (old) =>
                old
                    ? [newTodo, ...old.filter((t) => t.id !== ctx?.optimisticId)]
                    : [newTodo]
            );
        },
    });

    return { ...query, addTodo: mutation.mutate, addTodoState: mutation };
}