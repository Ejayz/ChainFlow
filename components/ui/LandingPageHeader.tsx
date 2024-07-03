"use client";

import Image from "next/image";

export default function LandingPageHeader() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Earn More</a>
              <ul className="p-2">
                <li>
                  <a>Ez Miner</a>
                </li>
                <p></p>
              </ul>
            </li>
            <li>
              <a>Donate</a>
            </li>
            <li>
              <a>Wallet</a>
            </li>
          </ul>
        </div>
        <Image
          src="/img/logo/chainflow-no-border.png"
          alt="ChainFlow Logo"
          width={200}
          height={100}
        />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Home</a>
          </li>
          <li>
            <details>
              <summary>Earn More</summary>
              <ul className="p-2">
                <li>
                  <a>Ez Miner</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Donate</a>
          </li>
          <li>
            <a>Wallet</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn btn-primary" href="/portal">
          Portal
        </a>
      </div>
    </div>
  );
}
