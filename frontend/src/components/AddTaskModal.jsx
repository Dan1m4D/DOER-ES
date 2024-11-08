import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Checkbox,
  Link,
  Button,
  Textarea,
} from "@nextui-org/react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../actions/TaskActions";

const schema = yup.object().shape({
  title: yup.string().required("Task name is required"),
  description: yup.string().required("Task description is required"),
});

// eslint-disable-next-line react/prop-types
const AddTaskModal = ({ isOpen, onClose, onOpenChange, setShowFeedback }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addTask = useMutation({
    mutationKey: ["addTask"],
    mutationFn: async (data) => createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      setShowFeedback({
        type: "success",
        message: "Task added successfully",
      });
      setTimeout(() => {
        setShowFeedback(null);
      }, 5000);
      onClose();
    },
    onError: (error) => {
      setShowFeedback({
        type: "error",
        message: error.message,
      });
      setTimeout(() => {
        setShowFeedback(null);
      }, 5000);
    }
  });

  const closeModal = () => {
    onClose();
  };

  const submitForm = (data) => {
    const timestamp = new Date().getTime();
    const formData = { ...data, timestamp };
    addTask.mutate(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      backdrop="opaque"
      isDismissable={false}
      isKeyboardDismissDisabled={false}
      size="xl"
      placement="top-center"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-2xl font-semibold text-cyan-900">
          Create a new task
        </ModalHeader>
        <form
          onSubmit={handleSubmit(submitForm)}
          id="add_task"
          className="flex-col gap-2"
        >
          <ModalBody>
            <Input
              autoFocus
              label="Task name"
              color="primary"
              variant="flat"
              isRequired
              {...register("title")}
              isInvalid={!!errors.title}
              errorMessage={errors.title?.message}
            />
            <Textarea
              label="Description"
              placeholder="Write a short description of the task"
              type="password"
              color="primary"
              variant="bordered"
              isRequired
              isInvalid={!!errors.description}
              errorMessage={errors.description?.message}
              {...register("description")}
            />
            <div className="flex justify-between px-1 py-2">
              <Checkbox
                classNames={{
                  label: "text-small",
                }}
              >
                Remember me
              </Checkbox>
              <Link color="primary" href="#" size="sm">
                Forgot password?
              </Link>
            </div>
          </ModalBody>
        </form>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={closeModal}>
            Cancel
          </Button>
          <Button color="primary" type="submit" form="add_task">
            Add Task
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTaskModal;
