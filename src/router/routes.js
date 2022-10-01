const routes =
    [
        {
            path: "/",
            name: "Start",
            components: {
                content: () => import("@/views/Start"),
            },
            meta: {
                title: "pages.main.title",
                public: true,
            }
        },
        {
            path: "/auth",
            name: "Auth",
            components: {
                content: () => import("@/views/Auth"),
            },
            meta: {
                title: "pages.auth.title",
                public: true,
            }
        },
        {
            path: "/results",
            name: "Results",
            components: {
                content: () => import("@/views/Results"),
            },
            meta: {
                title: "pages.results.title",
                public: true,
            }
        },
        {
            path: "/question",
            name: "Question",
            components: {
                content: () => import("@/views/Question"),
            },
            meta: {
                title: "pages.question.title",
                public: true,
            }
        },
        {
            path: "/leaderboard",
            name: "LeaderBoard",
            components: {
                content: () => import("@/views/LeaderBoard"),
            },
            meta: {
                title: "pages.leaderboard.title",
                public: true,
            }
        },
        {
            path: "/404",
            name: "NotFound",
            components: {
                content: () => import("@/views/404"),
            },
            meta: {
                public: true,
                title: "pages.404.title",
            }
        },
        {
            path: "*",
            redirect: "/404"
        }
    ];

export default routes