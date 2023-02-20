import icBlog from '@src/assets/icons/ic_blog.svg';
import icCart from '@src/assets/icons/ic_cart.svg';
import icChat from '@src/assets/icons/ic_chat.svg';
import icMail from '@src/assets/icons/ic_mail.svg';
import icUser from '@src/assets/icons/ic_user.svg';
import icBanking from '@src/assets/icons/ic_banking.svg';
import icBooking from '@src/assets/icons/ic_booking.svg';
import icKanban from '@src/assets/icons/ic_kanban.svg';
import icInvoice from '@src/assets/icons/ic_invoice.svg';
import icCalendar from '@src/assets/icons/ic_calendar.svg';
import icEcommerce from '@src/assets/icons/ic_ecommerce.svg';
import icAnalytics from '@src/assets/icons/ic_analytics.svg';
import icDashboard from '@src/assets/icons/ic_dashboard.svg';
import { PATH_DASHBOARD } from '../../../routes/paths';
import SvgIconStyle from '../../../components/SvgIconStyle';
import Label from '../../../components/Label';

const ICONS = {
  blog: <SvgIconStyle src={icBlog} sx={{ width: 1, height: 1 }} />,
  cart: <SvgIconStyle src={icCart} sx={{ width: 1, height: 1 }} />,
  chat: <SvgIconStyle src={icChat} sx={{ width: 1, height: 1 }} />,
  mail: <SvgIconStyle src={icMail} sx={{ width: 1, height: 1 }} />,
  user: <SvgIconStyle src={icUser} sx={{ width: 1, height: 1 }} />,
  kanban: <SvgIconStyle src={icKanban} sx={{ width: 1, height: 1 }} />,
  banking: <SvgIconStyle src={icBanking} sx={{ width: 1, height: 1 }} />,
  booking: <SvgIconStyle src={icBooking} sx={{ width: 1, height: 1 }} />,
  invoice: <SvgIconStyle src={icInvoice} sx={{ width: 1, height: 1 }} />,
  calendar: <SvgIconStyle src={icCalendar} sx={{ width: 1, height: 1 }} />,
  ecommerce: <SvgIconStyle src={icEcommerce} sx={{ width: 1, height: 1 }} />,
  analytics: <SvgIconStyle src={icAnalytics} sx={{ width: 1, height: 1 }} />,
  dashboard: <SvgIconStyle src={icDashboard} sx={{ width: 1, height: 1 }} />,
};

const navConfig = [
  {
    subheader: 'general',
    items: [
      { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      {
        title: 'e-commerce',
        path: PATH_DASHBOARD.general.ecommerce,
        icon: ICONS.ecommerce,
      },
      {
        title: 'analytics',
        path: PATH_DASHBOARD.general.analytics,
        icon: ICONS.analytics,
      },
      {
        title: 'banking',
        path: PATH_DASHBOARD.general.banking,
        icon: ICONS.banking,
      },
      {
        title: 'booking',
        path: PATH_DASHBOARD.general.booking,
        icon: ICONS.booking,
      },
    ],
  },
  {
    subheader: 'management',
    items: [
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'profile', path: PATH_DASHBOARD.user.profile },
          { title: 'cards', path: PATH_DASHBOARD.user.cards },
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.new },
          { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
          { title: 'account', path: PATH_DASHBOARD.user.account },
        ],
      },
      {
        title: 'e-commerce',
        path: PATH_DASHBOARD.eCommerce.root,
        icon: ICONS.cart,
        children: [
          { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
          { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
          { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
          { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
          { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
          { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
        ],
      },
      {
        title: 'invoice',
        path: PATH_DASHBOARD.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: 'list', path: PATH_DASHBOARD.invoice.list },
          { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
          { title: 'create', path: PATH_DASHBOARD.invoice.new },
          { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
        ],
      },
      {
        title: 'blog',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.blog,
        children: [
          { title: 'posts', path: PATH_DASHBOARD.blog.posts },
          { title: 'post', path: PATH_DASHBOARD.blog.demoView },
          { title: 'create', path: PATH_DASHBOARD.blog.new },
        ],
      },
    ],
  },
  {
    subheader: 'app',
    items: [
      {
        title: 'mail',
        path: PATH_DASHBOARD.mail.root,
        icon: ICONS.mail,
        info: (
          <Label variant="outlined" color="error">
            +32
          </Label>
        ),
      },
      { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
      {
        title: 'calendar',
        path: PATH_DASHBOARD.calendar,
        icon: ICONS.calendar,
      },
      { title: 'kanban', path: PATH_DASHBOARD.kanban, icon: ICONS.kanban },
    ],
  },
];

export default navConfig;
