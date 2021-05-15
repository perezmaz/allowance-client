/* eslint-disable import/no-unresolved */
import React from 'react';
// Icons
import {
  BsFillGridFill,
  BsFillCalendarFill,
  BsFillPersonFill,
  BsFillChatDotsFill,
} from 'react-icons/bs';
import { GiPiggyBank } from 'react-icons/gi';
import {
  FaClipboardList,
  FaChild,
  FaStickyNote,
} from 'react-icons/fa';

// Pages
import CategoryList from '../pages/category/List';
import CategoryForm from '../pages/category/AddEdit';
import ActivityList from '../pages/activity/List';
import ActivityForm from '../pages/activity/AddEdit';
import AllowanceList from '../pages/allowance/List';
import AllowanceForm from '../pages/allowance/AddEdit';
import TracingList from '../pages/tracing/List';
import TracingForm from '../pages/tracing/Add';
import TracingFormEdit from '../pages/tracing/Edit';
import LoginForm from '../pages/user/Login';
import RegisterForm from '../pages/user/Register';
import ForgotForm from '../pages/user/Forgot';
import ProfileForm from '../pages/user/Profile';
import ChildList from '../pages/child/List';
import ChildForm from '../pages/child/AddEdit';
import NotificationList from '../pages/notification/List';
import Dashboard from '../pages/dashboard/Dashboard';
import ActivateForm from '../pages/user/Activate';
import NoteList from '../pages/note/List';
import NoteForm from '../pages/note/AddEdit';
import MessageForm from '../pages/message/AddEdit';
import Wizard from '../pages/tutorial/Tutorial';

const routes = [
  {
    path: '/',
    component: Dashboard,
    exact: true,
    isPrivate: true,
    roles: ['parent', 'child'],
  },
  {
    type: 'link',
    path: '/category',
    component: CategoryList,
    exact: true,
    icon: <BsFillGridFill className="icon mr-2" />,
    text: 'menu.category',
    responsive: false,
    isPrivate: true,
    roles: ['parent'],
  },
  {
    path: '/category/new',
    component: CategoryForm,
    exact: true,
    isPrivate: true,
    roles: ['parent'],
  },
  {
    path: '/category/edit/:id',
    component: CategoryForm,
    exact: false,
    isPrivate: true,
    roles: ['parent'],
  },
  {
    type: 'link',
    path: '/activity',
    component: ActivityList,
    exact: true,
    icon: <FaClipboardList className="icon mr-2" />,
    text: 'menu.activity',
    responsive: false,
    isPrivate: true,
    roles: ['parent'],
  },
  {
    path: '/activity/new',
    component: ActivityForm,
    exact: true,
    isPrivate: true,
    roles: ['parent'],
  },
  {
    path: '/activity/edit/:id',
    component: ActivityForm,
    exact: false,
    isPrivate: true,
    roles: ['parent'],
  },
  {
    type: 'link',
    path: '/allowance',
    component: AllowanceList,
    exact: true,
    icon: <GiPiggyBank className="icon mr-2" />,
    text: 'menu.allowance',
    responsive: false,
    isPrivate: true,
    roles: ['parent'],
  },
  {
    path: '/allowance/new',
    component: AllowanceForm,
    exact: true,
    isPrivate: true,
    roles: ['parent'],
  },
  {
    path: '/allowance/edit/:id',
    component: AllowanceForm,
    exact: false,
    isPrivate: true,
    roles: ['parent'],
  },
  {
    type: 'link',
    path: '/tracing',
    component: TracingList,
    exact: true,
    icon: <BsFillCalendarFill className="icon mr-2" />,
    text: 'menu.tracing',
    responsive: false,
    isPrivate: true,
    roles: ['parent', 'child'],
  },
  {
    path: '/tracing/new',
    component: TracingForm,
    exact: true,
    isPrivate: true,
    roles: ['parent'],
  },
  {
    path: '/tracing/edit/:id',
    component: TracingFormEdit,
    exact: false,
    isPrivate: true,
    roles: ['parent', 'child'],
  },
  {
    type: 'link',
    path: '/profile',
    component: ProfileForm,
    exact: true,
    icon: <BsFillPersonFill className="icon mr-2" />,
    text: 'menu.profile',
    responsive: true,
    isPrivate: true,
    roles: ['parent', 'child'],
  },
  {
    type: 'link',
    path: '/child',
    component: ChildList,
    exact: true,
    icon: <FaChild className="icon mr-2" />,
    text: 'menu.children',
    responsive: true,
    isPrivate: true,
    roles: ['parent'],
  },
  {
    path: '/child/new',
    component: ChildForm,
    exact: true,
    isPrivate: true,
    roles: ['parent'],
  },
  {
    path: '/child/edit/:id',
    component: ChildForm,
    exact: false,
    isPrivate: true,
    roles: ['parent'],
  },
  {
    path: '/login',
    component: LoginForm,
    exact: false,
    roles: ['parent', 'child'],
  },
  {
    path: '/register',
    component: RegisterForm,
    exact: false,
    roles: ['parent', 'child'],
  },
  {
    path: '/forgot',
    component: ForgotForm,
    exact: false,
    roles: ['parent', 'child'],
  },
  {
    path: '/notifications',
    component: NotificationList,
    exact: true,
    isPrivate: true,
    roles: ['parent', 'child'],
  },
  {
    path: '/activate/:token',
    component: ActivateForm,
    exact: false,
    isPrivate: false,
    roles: ['parent', 'child'],
  },
  {
    type: 'link',
    path: '/note',
    component: NoteList,
    exact: true,
    icon: <FaStickyNote className="icon mr-2" />,
    text: 'menu.note',
    responsive: false,
    isPrivate: true,
    roles: ['parent'],
  },
  {
    path: '/note/new',
    component: NoteForm,
    exact: true,
    isPrivate: true,
    roles: ['parent'],
  },
  {
    path: '/note/edit/:id',
    component: NoteForm,
    exact: false,
    isPrivate: true,
    roles: ['parent'],
  },
  {
    type: 'link',
    path: '/message',
    component: MessageForm,
    exact: true,
    icon: <BsFillChatDotsFill className="icon mr-2" />,
    text: 'menu.messages',
    responsive: false,
    isPrivate: true,
    roles: ['parent', 'child'],
  },
  {
    path: '/tutorial',
    component: Wizard,
    exact: true,
    isPrivate: true,
    roles: ['parent'],
  },
];

export default routes;
