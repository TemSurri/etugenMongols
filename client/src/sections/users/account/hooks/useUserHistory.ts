import {
    useCallback,
    useEffect,
    useState
} from "react";

import axios from "axios";

import {
    getUserHistory
} from "../api/accountApi";

import type {
    UserHistoryPage
} from "../types/accountTypes";

const PAGE_SIZE = 6;

export function useUserHistory() {

    const [history, setHistory] =
        useState<UserHistoryPage | null>(
            null
        );

    const [page, setPage] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(false);

    const loadHistory =
        useCallback(
            async (
                requestedPage: number
            ) => {

                setLoading(true);
                setError(false);

                try {

                    const result =
                        await getUserHistory(
                            requestedPage,
                            PAGE_SIZE
                        );

                    setHistory(result);
                    setPage(
                        result.number
                    );

                } catch (err) {

                    if (
                        axios.isAxiosError(
                            err
                        )
                    ) {
                        console.error(
                            "Failed to load user history:",
                            err.response?.status
                        );
                    }

                    setError(true);

                } finally {

                    setLoading(false);

                }
            },
            []
        );

    useEffect(() => {

        void loadHistory(0);

    }, [loadHistory]);

    const nextPage = () => {

        if (
            history == null ||
            history.last ||
            loading
        ) {
            return;
        }

        void loadHistory(
            page + 1
        );
    };

    const previousPage = () => {

        if (
            history == null ||
            history.first ||
            loading
        ) {
            return;
        }

        void loadHistory(
            page - 1
        );
    };

    return {
        history,
        page,
        loading,
        error,
        nextPage,
        previousPage,
        reload: () =>
            loadHistory(page)
    };
}