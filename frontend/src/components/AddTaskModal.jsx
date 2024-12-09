/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useUserStore } from "../stores/userStore";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  Textarea,
  Select,
  SelectItem,
  DatePicker,
} from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  createTask,
  updateTask,
  getStatus,
  getPriorities,
} from "../actions/TaskActions";
import {
  today,
  getLocalTimeZone,
  now,
  toCalendarDateTime,
  fromAbsolute,
} from "@internationalized/date";

const schema = yup.object().shape({
  title: yup.string().required("Task name is required"),
  description: yup.string().required("Task description is required"),
  status: yup.string().required("Please select a status"),
  priority: yup.string().required("Please select a priority"),
  deadline: yup
    .mixed()
    .transform((data) => {
      return new Date(toCalendarDateTime(data).toString()).getTime();
    })
    .required("Please select a deadline"),
});

// eslint-disable-next-line react/prop-types
const AddTaskModal = ({
  isOpen,
  onClose,
  onOpenChange,
  setShowFeedback,
  isEdit,
  task,
}) => {
  const access_token = useUserStore((state) => state.access_token);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      status: "To Do",
      priority: "Low",
      deadline: now(getLocalTimeZone()),
    },
  });

  useEffect(() => {
    console.log(task);
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        deadline: fromAbsolute(task.deadline),
      });
    }
  }, [task, isEdit, reset]);

  const { data: status } = useQuery({
    queryKey: ["status"],
    queryFn: async () => getStatus(access_token),
  });

  const { data: priorities } = useQuery({
    queryKey: ["priorities"],
    queryFn: async () => getPriorities(access_token),
  });

  const addTask = useMutation({
    mutationKey: ["addTask"],
    mutationFn: async (data) => createTask(data, access_token),
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
    },
  });

  const editTask = useMutation({
    mutationKey: ["editTask"],
    mutationFn: async (data) => updateTask(data, access_token),
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      setShowFeedback({
        type: "success",
        message: "Task updated successfully",
      });
      setTimeout(() => {
        setShowFeedback(null);
      }, 5000);
      closeModal();
    },
    onError: (error) => {
      setShowFeedback({
        message: error.message,
      });
      setTimeout(() => {
        setShowFeedback(null);
      }, 5000);
    },
  });

  const closeModal = () => {
    reset({
      title: "",
      description: "",
      status: "To Do",
      priority: "Low",
      deadline: now(getLocalTimeZone()),
    });
    onClose();
  };

  const submitForm = (data) => {
    const timestamp = new Date().getTime();
    const formData = { ...data, timestamp };
    console.log(formData);
    reset();
    if (task) {
      const updated_at = new Date().getTime();
      editTask.mutate({ ...formData, id: task.id, updated_at }, access_token  );
    } else {
      addTask.mutate(formData, access_token);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={closeModal}
      backdrop="opaque"
      isDismissable={false}
      isKeyboardDismissDisabled={false}
      size="xl"
      placement="top-center"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-4 text-2xl font-semibold text-cyan-900">
          {isEdit ? "📝 Edit task" : "📝 Create a new task"}
        </ModalHeader>
        <form
          onSubmit={handleSubmit(submitForm)}
          id="add_task"
          className="flex-col gap-2"
        >
          <ModalBody>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Task name"
                  color="primary"
                  variant="flat"
                  isRequired
                  isInvalid={!!errors.title}
                  errorMessage={errors.title?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  placeholder="Write a short description of the task"
                  color="primary"
                  variant="bordered"
                  isRequired
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                />
              )}
            />
            <section className="flex gap-2">
              <Select
                {...register("status")}
                label="Status"
                color="default"
                variant="flat"
                isRequired
                placeholder="Select a status"
                isInvalid={!!errors.status}
                errorMessage={errors.status?.message}
              >
                {status?.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </Select>

              <Select
                {...register("priority")}
                label="Priority"
                color="secondary"
                variant="flat"
                isRequired
                placeholder="Select a priority"
                isInvalid={!!errors.priority}
                errorMessage={errors.priority?.message}
              >
                {priorities?.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </Select>
            </section>
            <Controller
              name="deadline"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Deadline"
                  color="primary"
                  variant="flat"
                  showMonthAndYearPickers
                  hideTimeZone
                  isRequired
                  minValue={today(getLocalTimeZone())}
                  isInvalid={!!errors.deadline}
                  errorMessage={errors.deadline?.message}
                  {...field}
                />
              )}
            />
          </ModalBody>
        </form>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={closeModal}>
            Cancel
          </Button>
          <Button color="primary" type="submit" form="add_task">
            {isEdit ? "Update" : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTaskModal;
