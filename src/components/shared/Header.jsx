
import React, { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { UserAuth } from '../../Context/AuthContext'
import { AiOutlineMenu } from 'react-icons/ai'
import { AiOutlineShoppingCart } from 'react-icons/ai' // Added cart icon

export default function Header({sideBarOpen, setSideBarOpen}) {
	const navigate = useNavigate()
	const [searchValue, setSearchValue]=useState('');
	//const {logoutUser}=UserAuth();

	const handleOnValueChange =(e)=>{
		setSearchValue(e.target.value)
		console.log("kkkkkkkkkkkkkkkkkkkkkkk ",searchValue)
	}
	// const handleLogout = ()=>{
	// 	logoutUser();
	// 	navigate('/')
	// }

	return (
		<div className="bg-white w-full h-16 px-4 flex items-center border-b border-gray-200 justify-between">
			<div onClick={()=>navigate('/')} className="relative hidden lg:flex">
				<h1 className='text-xl font-semibold'>SmatCommerce</h1>
			</div>
			<div className="flex justify-between items-center w-full gap-2 mr-2">
				<AiOutlineMenu
					onClick={()=>setSideBarOpen(!sideBarOpen)}
					size={30}
					className='lg:hidden' 
				/>
				<div className='flex justify-end items-center w-full gap-4'>
					{/* Cart Icon */}
					<button
						onClick={() => navigate('/mycart')}
						className="group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 hover:bg-gray-100 focus:outline-none active:bg-gray-100"
					>
						<AiOutlineShoppingCart fontSize={24} />
						{/* Optional: Add cart items count */}
						<span className="ml-1 text-sm font-medium">0</span>
					</button>

					<Menu as="div" className="relative">
						<div>
							<Menu.Button className="ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
								<span className="sr-only">Open user menu</span>
								<div
									className="h-10 w-10 rounded-full bg-[#386A6B] bg-cover bg-no-repeat bg-center"
									style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1685208996717-ae23ee48f45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60")' }}
								>
									<span className="sr-only">Dylan Dzvene</span>
								</div>
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
							<Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
								<Menu.Item>
									{({ active }) => (
										<div
											onClick={() => navigate('/home/userprofile')}
											className={classNames(
												active && 'bg-gray-100',
												'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
											)}
										>
											Your Profile
										</div>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<div
											onClick={() => navigate('/admin/dashboard')}
											className={classNames(
												active && 'bg-gray-100',
												'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
											)}
										>
											Back Office
										</div>
									)}
								</Menu.Item>
								
								<Menu.Item>
									{({ active }) => (
										<div
											onClick={() => navigate('/settings')}
											className={classNames(
												active && 'bg-gray-100',
												'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
											)}
										>
											Settings
										</div>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<div
											onClick={()=>{handleLogout()}}
											className={classNames(
												active && 'bg-gray-100',
												'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
											)}
										>
											Sign out
										</div>
									)}
								</Menu.Item>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
			</div>
		</div>
	)
}