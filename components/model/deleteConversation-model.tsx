"use client";
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import Loader from '../Loader';
import { useRouter } from 'next/navigation';

interface DeleteConversationModalProps {
  isOpen: boolean;
  loading: boolean;
  onConfrim: () => void;
  onClose: () => void;
}

const DeleteConversationModal: React.FC<DeleteConversationModalProps> = ({
  isOpen,
  loading,
  onConfrim,
  onClose
}) => {
  const router = useRouter();
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfrim(); 
    router.push('/'); 
    onClose();  
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#40414E] text-white">
        <DialogHeader>
          <DialogTitle>Delete Conversation</DialogTitle>
          <DialogDescription>Are you sure you want to delete this conversation?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" disabled={loading} onClick={onClose}>
            Close
          </Button>
          <Button type="submit" variant="destructive" disabled={loading} onClick={handleConfirm}>
            {loading ? <Loader /> : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConversationModal;
