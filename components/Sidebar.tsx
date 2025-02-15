
import { ApiCall } from '@/lib/utils';
import React, { useEffect, useState, useCallback } from 'react';

interface ApiResponse {
  data: MenuItem[];
  status: string;
  message: string;
}

interface SubMenu {
  id: string;
  title: string;
  path: string;
  permissions: string[];
  isActive: boolean;
}

interface MenuItem {
  id: string;
  title: string;
  path: string;
  permissions: string[];
  subMenus: SubMenu[];
}

export default function Sidebar() {
  const [sideMenu, setSideMenu] = useState<MenuItem[]>([]);

  const getSideMenu = async () => {
    try {
      const response = await ApiCall<ApiResponse>('/api/menu/getMenu', {}, 'GET');
      if (response.status === 'success') {
        setSideMenu(response.data);
      } else {
        console.error('Failed to fetch menu');
      }
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };
  console.log(sideMenu,"sideMenu");


  useEffect(() => {
    getSideMenu();
  }, []);


  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-4">
      <h2 className="text-lg font-bold mb-4">Sidebar</h2>
      <ul>
      
      </ul>
    </div>
  );
}
