import React, { useState } from 'react';
import { Button } from '../components/ui/button'; // Adjust the import paths based on your folder structure
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Input } from '../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  LogOut,
  Menu,
  X,
  ChevronDown,
  BarChart,
  Users,
  FileText,
  BookOpen,
} from 'lucide-react'; // Ensure you have lucide-react installed

function TeacherDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-green-600 text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4">
          <span className="text-2xl font-semibold">Teacher Dashboard</span>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleSidebar}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-8 space-y-2 px-4">
          {[
            { name: 'Dashboard', icon: BarChart, id: 'dashboard' },
            { name: 'View Students', icon: Users, id: 'students' },
            { name: 'Create Assignment', icon: FileText, id: 'create' },
            { name: 'View Assignments', icon: BookOpen, id: 'assignments' },
            { name: 'View Submissions', icon: FileText, id: 'submissions' },
          ].map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between bg-white p-4 shadow">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-semibold">Teacher Dashboard</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                Teacher Name
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          {activeTab === 'dashboard' && <DashboardOverview />}
          {activeTab === 'students' && <ViewStudents />}
          {activeTab === 'create' && <CreateAssignment />}
          {activeTab === 'assignments' && <ViewAssignments />}
          {activeTab === 'submissions' && <ViewSubmissions />}
        </main>
      </div>
    </div>
  );
}

function DashboardOverview() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">View Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Go to Students
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Create Assignment</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Create New
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">View Submissions</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Check Submissions
            </Button>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground">John Doe submitted Assignment 1</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground">New assignment "Math Quiz" created</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground">5 new students assigned to your class</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ViewStudents() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Assigned Students</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice Johnson</TableCell>
            <TableCell>alice.johnson@example.com</TableCell>
            <TableCell>Assignment 1 submitted</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Williams</TableCell>
            <TableCell>bob.williams@example.com</TableCell>
            <TableCell>No pending assignments</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

function CreateAssignment() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Create Assignment</h2>
      <form className="space-y-4">
        <div>
          <Label htmlFor="title">Assignment Title</Label>
          <Input id="title" placeholder="Enter assignment title" />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            placeholder="Enter assignment description"
            className="w-full rounded-md border p-2"
            rows={4}
          ></textarea>
        </div>
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input id="dueDate" type="date" />
        </div>
        <div>
          <Label htmlFor="students">Assign to Students</Label>
          <select id="students" multiple className="w-full rounded-md border p-2">
            <option>Alice Johnson</option>
            <option>Bob Williams</option>
            <option>Charlie Brown</option>
          </select>
        </div>
        <Button type="submit">Create Assignment</Button>
      </form>
    </div>
  );
}

function ViewAssignments() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">View Assignments</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Due Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Math Quiz</TableCell>
            <TableCell>Complete the exercises from Chapter 5</TableCell>
            <TableCell>2024-10-10</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Science Project</TableCell>
            <TableCell>Group project on the Solar System</TableCell>
            <TableCell>2024-10-20</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

function ViewSubmissions() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">View Submissions</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Assignment</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice Johnson</TableCell>
            <TableCell>Math Quiz</TableCell>
            <TableCell>Submitted</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Williams</TableCell>
            <TableCell>Science Project</TableCell>
            <TableCell>Pending</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default TeacherDashboard;
