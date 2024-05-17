'use client';

import { AiOutlineMenu } from 'react-icons/ai'
import { FiGlobe } from 'react-icons/fi'
import Avatar from '../Avatar';
import { useState, useCallback } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal';
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu : React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen(val => !val);
    }, []);

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        // Open Rent Modal
        rentModal.onOpen();

    }, [currentUser, loginModal, rentModal]);

    return (
        <div className="relative">
            <div className="flex flex-row items-center">
                <div
                    onClick={onRent}
                    className="
                        hidden
                        md:block
                        text-sm
                        font-bold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        text-neutral-800
                        transition
                        cursor-pointer
                        whitespace-nowrap
                    "
                >
                    Airbnb your home
                </div>
                <div className="hidden md:block">
                    <div 
                        className="
                            p-4
                            mr-2
                            rounded-full 
                            hover:bg-neutral-100
                            cursor-pointer 
                            transition
                        "
                    >
                        <FiGlobe size={18} />
                    </div>
                </div>
                <div
                    onClick={ toggleOpen }
                    className={`
                        p-4
                        md:p-1.5
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:drop-shadow
                        bg-white
                        ${isOpen ? 'drop-shadow' : ''}
                        transition
                    `}
                >
                    <AiOutlineMenu className="md:ml-2" />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className="
                        mt-3
                        absolute
                        rounded-xl
                        drop-shadow-xl
                        ring-4
                        ring-gray-100
                        ring-opacity-30
                        w-[40vw]
                        md:w-[28vw]
                        bg-white
                        overflow-hidden
                        right-0
                        text-sm
                        py-2
                        max-w-[16rem]
                    "
                >
                    <div className="flex flex-col cursor-pointer ">
                        {currentUser ? (
                            <>
                                <MenuItem
                                    onClick={() => router.push('/trips')}
                                    label="Trips"
                                    isBold
                                />
                                <MenuItem
                                    onClick={() => router.push('/favorites')}
                                    label="Favorites"
                                    isBold
                                />
                                <MenuItem
                                    onClick={() => router.push('/reservations')}
                                    label="Reservations"
                                    isBold
                                />
                                <MenuItem
                                    onClick={() => router.push('/properties')}
                                    label="Properties"
                                    isBold
                                />
                                <div className="my-2 bg-neutral-200 w-full h-[1px]" />
                                <MenuItem
                                    onClick={rentModal.onOpen}
                                    label="Airbnb your home"
                                />
                                {/* <MenuItem
                                    onClick={() => {}}
                                    label="Account"
                                /> */}
                                <div className="my-2 bg-neutral-200 w-full h-[1px]" />
                                {/* <MenuItem
                                    onClick={() => {}}
                                    label="Help"
                                /> */}
                                <MenuItem
                                    onClick={() => signOut()}
                                    label="Log Out"
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label="Sign up"
                                    isBold
                                />
                                <MenuItem
                                    onClick={loginModal.onOpen}
                                    label="Login"
                                />
                                <div className="my-2 bg-neutral-200 w-full h-[1px]" />
                                <MenuItem
                                    onClick={onRent}
                                    label="Airbnb your home"
                                />
                                {/* <MenuItem
                                    onClick={() => {}}
                                    label="Help"
                                /> */}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;