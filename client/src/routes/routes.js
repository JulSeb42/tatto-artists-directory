// Basic pages
import Homepage from "../pages/Homepage"
import NotFound from "../pages/NotFound"

// Auth
import Signup from "../pages/auth/Signup"
import ThankYou from "../pages/auth/ThankYou"
import Verify from "../pages/auth/Verify"
import Login from "../pages/auth/Login"
import ForgotPassword from "../pages/auth/ForgotPassword"
import ForgotSent from "../pages/auth/ForgotSent"
import ResetPassword from "../pages/auth/ResetPassword"
import Goodbye from "../pages/auth/Goodbye"

// User
import MyAccount from "../pages/user/MyAccount"
import EditAccount from "../pages/user/EditAccount"
import EditPassword from "../pages/user/EditPassword"

// Routes
const routes = [
    // Basic pages
    {
        path: "/",
        element: Homepage,
        protected: false,
        anon: false,
        edit: false,
    },
    {
        path: "*",
        element: NotFound,
        protected: false,
        anon: false,
        edit: false,
    },

    // Auth
    {
        path: "/signup",
        element: Signup,
        protected: false,
        anon: true,
        edit: false,
    },
    {
        path: "/thank-you",
        element: ThankYou,
        protected: false,
        anon: false,
        edit: false,
    },
    {
        path: "/verify/:token/:id",
        element: Verify,
        protected: false,
        anon: false,
        edit: true,
    },
    {
        path: "/login",
        element: Login,
        protected: false,
        anon: true,
        edit: false,
    },
    {
        path: "/login/forgot-password",
        element: ForgotPassword,
        protected: false,
        anon: true,
        edit: false,
    },
    {
        path: "/login/forgot-password/email-sent",
        element: ForgotSent,
        protected: false,
        anon: true,
        edit: false,
    },
    {
        path: "/reset-password/:token/:id",
        element: ResetPassword,
        protected: false,
        anon: true,
        edit: false,
    },
    {
        path: "/goodbye",
        element: Goodbye,
        protected: false,
        anon: false,
        edit: false,
    },

    // User
    {
        path: "/my-account",
        element: MyAccount,
        protected: true,
        anon: false,
        edit: false,
    },
    {
        path: "/my-account/edit",
        element: EditAccount,
        protected: true,
        anon: false,
        edit: true,
    },
    {
        path: "/my-account/edit-password",
        element: EditPassword,
        protected: true,
        anon: false,
        edit: true,
    },
]

export default routes
