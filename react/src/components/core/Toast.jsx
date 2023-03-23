import { useStateContext } from "../../contexts/ContextProvider";

export const Toast = () => {
    const { toast } = useStateContext();
    return (
        <>
            {toast.show && (
                <div className="w-[300px] fixed right-4 bottom-4 z-50 py-2 px-3 text-white text-sm rounded bg-emerald-500 animate-fade-in-down">
                    {toast.message}
                </div>) 
            }
        </>
    );
}