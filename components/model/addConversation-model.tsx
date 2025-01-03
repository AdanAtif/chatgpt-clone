"use client";
import { useDispatch } from 'react-redux';
import { addConversation } from '@/store/ConversationSlice';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AppDispatch } from '@/store/store';
import { useRouter } from 'next/navigation';

interface AddConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  name: string;
}

const AddConversationModal: React.FC<AddConversationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmitHandler: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      const resultAction = await dispatch(addConversation(data.name));
      if (addConversation.fulfilled.match(resultAction)) {
        const newConversation = resultAction.payload; // This contains { id, name }
        reset();
        router.push(`/${newConversation.id}`);
        onClose();
      } else {
        // Handle error if needed
        console.error('Failed to add conversation:', resultAction.payload);
      }
    } finally {
      setLoading(false);
    }
  };
  

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#40414E] text-white">
        <DialogHeader>
          <DialogTitle>New Conversation</DialogTitle>
          <DialogDescription>This will add a new conversation.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="conversation" className="text-right">
                Name
              </label>
              <Input
                id="conversation"
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="col-span-3"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="destructive" disabled={loading} onClick={onClose}>
              Close
            </Button>
            <Button type="submit" variant="secondary" disabled={loading}>
              {loading ? 'Loading...' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddConversationModal;
