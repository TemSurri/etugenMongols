import { useEffect,useState } from "react";
export function useVerificationCountdown() {
 const [cooldown, setCooldown] = useState(0);
 useEffect(() => {

        if (cooldown <= 0) {
            return;
        }


        const timer =
            window.setInterval(() => {

                setCooldown(
                    (current) => {

                        if (current <= 1) {

                            window.clearInterval(timer);

                            return 0;
                        }

                        return current - 1;
                    }
                );

            }, 1000);


        return () =>
            window.clearInterval(timer);

    }, [cooldown]);
 return [cooldown, setCooldown] as const;
}
