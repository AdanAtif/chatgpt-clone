// "use client";

// import { X } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Input } from "../ui/input";
// import Loader from "../Loader";



// interface AddConversaionModelProps {
//   isOpen: boolean;
//   onClose: () => void;
// }


// const AddConversaionModel: React.FC<AddConversaionModelProps> = ({
//   isOpen,
//   onClose,
// }) => {
//   const [isMounted, setIsMounted] = useState(false);
//   const [loading, setLoading] = useState(false);

  
//   useEffect(() => {
//     return () => {
//       setIsMounted(false);
//     };
//   }, []);

//   if (!isMounted || !isOpen) {
//     return null;
//   }

//   const onSubmitHandler = async () => {
    
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm">
//       <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
//         <div className="flex flex-col space-y-1.5 text-center sm:text-left">
//           <div className="flex flex-row justify-between items-center">
//             <div className="text-lg font-semibold leading-none tracking-tight">
//               New Conversation
//             </div>
//             <div
//               onClick={onClose}
//               className="p-[3px] cursor-pointer flex justify-center items-center border-2 border-black  rounded-md dark:border-white  "
//             >
//               <X className="h-4 w-4 " />
//             </div>
//           </div>
//           <div className="text-sm text-muted-foreground">
//             This will add a new conversation.
//           </div>
//         </div>
//         <div>
//           <form className="space-y-6" >
//             <Input
//               id="Conversation"
//               type="text"
//               disabled={loading}
//             />
//             <div className="pt-6 space-x-2 flex items-center justify-between w-full">
//               <button
//                 disabled={loading}
//                 className="rounded-lg border-2 py-2 px-3 border-stone-300 hover:border-black hover:bg-stone-200 dark:hover:bg-exact-purple dark:border-white  opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
//                 onClick={onClose}
//               >
//                 Close
//               </button>
//               <button
//                 disabled={loading}
//                 className="py-2 px-3 text-white rounded-lg dark:bg-exact-light-orange dark:hover:bg-exact-dark-orange/90 hover:bg-exact-light-orange/90 bg-exact-light-orange opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
//                 onClick={onSubmitHandler}
//               >
//                 {loading ? <Loader/> : "Add"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddConversaionModel;
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface AddConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddConversationModal: React.FC<AddConversationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async () => {
    setLoading(true);
    // Add your submission logic here
    setLoading(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>New Conversation</DialogTitle>
            <div
              onClick={onClose}
              className="p-[3px] cursor-pointer flex justify-center items-center border-2 border-black rounded-md dark:border-white"
            >
              <X className="h-4 w-4" />
            </div>
          </div>
          <DialogDescription>
            This will add a new conversation. Please fill out the details below.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="conversation" className="text-right">
                Name
              </label>
              <Input id="conversation" type="text" disabled={loading} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              disabled={loading}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              type="submit"
              disabled={loading}
              onClick={onSubmitHandler}
            >
              {loading ? "Loading..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddConversationModal;
