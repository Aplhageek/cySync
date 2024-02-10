import { useCallback, useEffect, useState } from "react";
import { PAGE_ROUTES } from "../utils/enum";
import {
  NavigateOptions,
  useLocation,
  useMatch,
  useNavigate,
} from "react-router";
import { COMMON_EVENTS, commonCustomEvent } from "../services/customEvents";

const useRouteManager = () => {
  const [route, setRoute] = useState(PAGE_ROUTES.HOME);
  const navigateTo = useNavigate();
  const location = useLocation();
  const isHomePage = useMatch(PAGE_ROUTES.HOME);

  const navigateToPage = useCallback(
    (routeToSwitch: PAGE_ROUTES, options?: NavigateOptions) => {
      commonCustomEvent.dispatch(COMMON_EVENTS.NAVIGATION_TRIGGERED, {
        route: routeToSwitch,
      });
      setRoute(routeToSwitch);
      navigateTo(routeToSwitch, options);
    },
    [navigateTo]
  );

  useEffect(() => {
    const pathName = location.pathname as PAGE_ROUTES;
    if (!Object.values(PAGE_ROUTES).includes(pathName)) {
      navigateToPage(PAGE_ROUTES.PAGE_NOT_FOUND);
    } else if (isHomePage) {
      navigateToPage(PAGE_ROUTES.WALLET_LIST);
    }
  }, [isHomePage, location, navigateToPage]);

  return { route, navigateToPage };
};

export default useRouteManager;
