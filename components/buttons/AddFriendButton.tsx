"use client";

import { addFriendValidator } from "@/lib/validations/add-friend";
import axios, { AxiosError } from "axios";
import { LoaderCircle, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";

type FormData = z.infer<typeof addFriendValidator>;

const AddFriendButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const addFriend = async (email: string) => {
    try {
      setIsLoading(true);
      const validatedEmail = addFriendValidator.parse({ email });

      const response = await axios.post("/api/friends/add", {
        email: validatedEmail.email,
      });

      if (response.status === 200) {
        toast.success("Friend request sent successfully!", {
          description: `Friend request to ${email.toUpperCase()} sent on ${new Date().toLocaleString()}`,
        });
        reset();
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0].message;
        setError("email", { message: errorMessage });
        toast.error(errorMessage, {
          description: `Please try again later.`,
        });
        return;
      }

      if (error instanceof AxiosError) {
        const errorMessage =
          typeof error.response?.data === "object"
            ? error.response.data.message
            : error.response?.data || "Failed to add friend";
        setError("email", { message: errorMessage });
        toast.error(errorMessage, {
          description: `Please try again later.`,
        });
        return;
      }

      const errorMessage = "Something went wrong. Please try again.";
      setError("email", { message: errorMessage });
      toast.error(errorMessage, {
        description: `Please try again later.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-1 w-full"
    >
      <label htmlFor="email" className="font-bold text-lg text-[var(--white)]">
        Add Friend by Email:
      </label>
      <div className="flex gap-3">
        <div className="flex flex-col gap-1">
          <input
            {...register("email")}
            type="email"
            id="email"
            className="md:w-[400px]
            w- h-8 border-[var(--border)] font-bold
            bg-[var(--white)] p-3 rounded-lg border-[2px] text-[var(--black)]
              focus:outline-none focus:ring-1 focus:ring-[var(--yellow)]"
            placeholder="you@example.com"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-lg font-bold text-[var(--red)]">
              {errors.email.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="md:w-2/10
          w-1/3 h-8 py-2 px-4 text-2xl font-semibold 
    bg-[var(--yellow)] text-[var(--black)] rounded-lg shadow-lg transition-all 
    hover:opacity-85 cursor-pointer hover:underline disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <div className="flex items-center">
              <LoaderCircle className="animate-spin" />
            </div>
          ) : (
            <div className="flex items-center justify-end gap-3">
              <UserPlus />
              <p
                className="lg:block
              hidden text-lg font-bold"
              >
                Add as Friend
              </p>
            </div>
          )}
        </button>
      </div>
    </form>
  );
};

export default AddFriendButton;
