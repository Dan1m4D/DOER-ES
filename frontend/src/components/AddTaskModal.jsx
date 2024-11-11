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
import { createTask, getStatus, getPriorities } from "../actions/TaskActions";
import { today, getLocalTimeZone, now, toCalendarDateTime } from "@internationalized/date";

const schema = yup.object().shape({
  title: yup.string().required("Task name is required"),
  description: yup.string().required("Task description is required"),
  status: yup.string().required("Please select a status"),
  priority: yup.string().required("Please select a priority"),
  deadline: yup
    .mixed()
    .transform((data) => {
      return new Date(toCalendarDateTime(data).toString()).getTime();
      }
    )
    .required("Please select a due date"),
});

// eslint-disable-next-line react/prop-types
const AddTaskModal = ({ isOpen, onClose, onOpenChange, setShowFeedback }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: status } = useQuery({
    queryKey: ["status"],
    queryFn: async () => getStatus(),
  });

  const { data: priorities } = useQuery({
    queryKey: ["priorities"],
    queryFn: async () => getPriorities(),
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
    },
  });

  const closeModal = () => {
    onClose();
  };

  const submitForm = (data) => {
    const timestamp = new Date().getTime();
    const formData = { ...data, timestamp };
    console.log(formData);
    reset();
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
        <ModalHeader className="flex flex-col gap-4 text-2xl font-semibold text-cyan-900">
          📝 Create a new task
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

            <section className="flex gap-2">
              <Select
                label="Status"
                color="default"
                variant="flat"
                isRequired
                placeholder="Select a status"
                isInvalid={!!errors.status}
                errorMessage={errors.status?.message}
                defaultSelectedKeys={["To Do"]}
                {...register("status")}
              >
                {status?.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Priority"
                color="secondary"
                variant="flat"
                isRequired
                placeholder="Select a priority"
                isInvalid={!!errors.priority}
                errorMessage={errors.priority?.message}
                defaultSelectedKeys={["Low"]}
                {...register("priority")}
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
              defaultValue={now(getLocalTimeZone())}
              render={({ field }) => (
                <DatePicker
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
            Add Task
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTaskModal;
