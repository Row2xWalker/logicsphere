import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
const Sidebar = () => {
  return (
    <aside className="bg-gray-600 text-white w-64">
      <div className="relative h-32">
        <Image src="/logo.png" alt="logo" fill={true} />
      </div>
      <nav className="mt-16 p-4">
        <ul>
          <li className="mb-2">
            <Link href="/" className="hover:text-blue-200">
              Home
            </Link>
          </li>
          <li className="mb-2">
            Records
            <ul>
              <li className="ml-4">
                <Link href="/records/par" className="hover:text-blue-200">
                  - PAR
                </Link>
              </li>

              <li className="ml-4">
                <Link href="/records/ptr" className="hover:text-blue-200">
                  - PTR
                </Link>
              </li>
            </ul>
          </li>
          <li className="mb-2">
            <Link href="/reports" className="hover:text-blue-200">
              Reports
            </Link>
          </li>
          <li className="mb-2">
            System
            <ul>
              <li className="ml-4">
                <Link href="/useraccount" className="hover:text-blue-200">
                  - User Account
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;