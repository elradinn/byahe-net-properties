"use client";

import axios from "axios";
import { AiFillGithub, AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import usePaymentModal from "@/app/hooks/usePaymentModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";

const PaymentModal = () => {
    const paymentModal = usePaymentModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            card_number: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .post("/api/register", data)
            .then(() => {
                toast.success("Successfully registered! 🚀");
            })
            .catch((err) => {
                toast.error(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Proceed to Payment"
                subtitle="Please provide your payment information"
            />
            <Input
                id="card_number"
                label="Card Number"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <div className="flex flex-row items-center gap-3">
                <div className="w-full h-[1px] bg-neutral-200" />
                {/* <div className="text-xs font-semibold text-neutral-500">or</div> */}
                <div className="w-full h-[1px] bg-neutral-200" />
            </div>
            {/* <Button 
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button 
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            /> */}
            {/* <Button 
                outline
                label="Continue with Facebook"
                icon={AiFillFacebook}
                onClick={() => signIn('facebook')}
            /> */}
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={paymentModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={paymentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            // footer={footerContent}
        />
    );
};

export default PaymentModal;
