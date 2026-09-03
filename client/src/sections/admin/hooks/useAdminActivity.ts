import {
    useCallback,
    useEffect,
    useState
} from "react";

import axios from "axios";

import {
    getUserHistory
} from "../../users/account/api/accountApi";

import type {
    UserHistoryItem
} from "../../users/account/types/accountTypes";


const HISTORY_FETCH_SIZE =
    20;


export function useAdminActivity() {

    const [
        activity,
        setActivity
    ] =
        useState<UserHistoryItem[]>(
            []
        );


    const [
        loading,
        setLoading
    ] =
        useState(true);


    const [
        error,
        setError
    ] =
        useState(false);


    const loadActivity =
        useCallback(
            async () => {

                setLoading(
                    true
                );

                setError(
                    false
                );


                try {

                    const history =
                        await getUserHistory(
                            0,
                            HISTORY_FETCH_SIZE
                        );


                    const eventActivity =
                        history.content.filter(
                            item =>
                                item.type ===
                                    "ACTIVITY" &&

                                item.resource ===
                                    "EVENT" &&

                                (
                                    item.operation ===
                                        "CREATE" ||

                                    item.operation ===
                                        "UPDATE"
                                )
                        );


                    setActivity(
                        eventActivity
                    );

                } catch (err) {

                    if (
                        axios.isAxiosError(
                            err
                        )
                    ) {

                        console.error(
                            "Failed to load admin event activity:",
                            err.response?.status
                        );

                    } else {

                        console.error(
                            "Failed to load admin event activity:",
                            err
                        );

                    }


                    setActivity(
                        []
                    );

                    setError(
                        true
                    );

                } finally {

                    setLoading(
                        false
                    );

                }

            },
            []
        );


    useEffect(
        () => {

            void loadActivity();

        },
        [
            loadActivity
        ]
    );


    return {

        activity,

        loading,

        error,

        reload:
            loadActivity
    };
}