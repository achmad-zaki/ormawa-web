import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Avatar from '../public/avatar.png';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { BiDownArrow } from 'react-icons/bi';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Header = () => {
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push('/'); // Replace with your desired redirect URL after logout
  }

  return (
    <div className='fixed top-0 left-0 bg-white w-full h-max py-3.5 px-4 z-30 drop-shadow-xl'>
      <div className="flex justify-end">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <Image src={Avatar} width={30} height={30} alt='avatar' />
              <BiDownArrow size={12} className='mt-2 text-md' />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <form method="POST" action="#">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        type="submit"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block w-full px-4 py-2 text-left text-sm'
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </form>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
