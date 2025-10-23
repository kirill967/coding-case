"use client";

import React, { useState } from "react";

import { Plus, Search, BookOpen, Folder } from "lucide-react";

import ChatGPT from "@/app/components/logos/ChatGPT";

function SidebarAction({
  icon: Icon,
  children,
  collapsed = false,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
  collapsed?: boolean;
}) {
  if (collapsed) {
    <div className="flex flex-col items-center justify-center h-full min-h-[64px] py-4">
      <button className="flex px-3 py-2.5 gap-3 text-md w-full hover:bg-gray-200 text-gray-900 rounded-xl items-center">
        <Icon className="w-4 h-4 flex-shrink-0" />
      </button>
      ;
    </div>;
  }
  return (
    <button className="flex px-3 py-2.5 gap-3 text-md w-full hover:bg-gray-200 text-gray-900 rounded-xl items-center">
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span>{children}</span>
    </button>
  );
}
export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        flex flex-col h-screen border-r border-gray-50 bg-white
        transition-all duration-200 ease-in-out
        ${collapsed ? "w-12" : "w-56"}
        shadow-sm
      `}
    >
      <header className="sticky top-0 z-10 bg-inherit">
        {collapsed ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[64px] py-4">
            <button
              className="rounded-full hover:bg-gray-300/60 p-1 transition-colors duration-150"
              onClick={() => setCollapsed(!collapsed)}
              aria-label="Expand sidebar"
            >
              <ChatGPT size={28} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between px-3 py-3">
            <button
              className="rounded-full hover:bg-gray-300/60 p-1 transition-colors duration-150"
              onClick={() => setCollapsed(!collapsed)}
              aria-label="Collapse sidebar"
            >
              <ChatGPT size={28} />
            </button>
          </div>
        )}
        <div className={collapsed ? "hidden" : "block"}>
          <div className="px-2">
            <SidebarAction icon={Plus}>New chat</SidebarAction>
            <SidebarAction icon={Search}>Search chat</SidebarAction>
            <SidebarAction icon={BookOpen}>Library</SidebarAction>
            <SidebarAction icon={Folder}>Project</SidebarAction>
          </div>
        </div>
      </header>

      <main className={collapsed ? "hidden" : "block flex-1"}>
        <span className="flex px-3 py-4 gap-3 rounded-xl text-md w-full items-center text-gray-900 my-6 mx-2">
          GPTs
        </span>
        <span className="flex px-3 py-4 gap-3 rounded-xl text-md w-full items-center text-gray-900 my-6 mx-2">
          Chats
        </span>
      </main>

      <footer className="sticky bottom-0 bg-white p-2">
        <span
          className={`text-sm text-gray-900 ${
            collapsed ? "hidden" : "block mr-5"
          }`}
        >
          user name
        </span>
        <span
          className={`text-sm text-gray-900 ${
            collapsed ? "hidden" : "block mr-5"
          }`}
        >
          Free
        </span>
      </footer>
    </aside>
  );
}
