import { useContext } from 'react';
import { NextPageContext } from 'next';
import { parseCookies } from 'nookies';
import { AuthContext } from '../contexts/AuthContext';
import { constant } from '../constant';

export function useAuth() {
  return useContext(AuthContext);
}

type InterceptionFunction = (ctx: NextPageContext) => Promise<{
  redirect?: {
    destination: string;
    permanent: boolean;
  };
  props?: { [key: string]: any };
}>;

export async function authPage(
  ctx: NextPageContext,
  fn?: InterceptionFunction
) {
  const { ['branium.jwt']: jwt } = parseCookies(ctx);

  if (!jwt) {
    return {
      redirect: {
        destination: constant.routes.SIGN_IN,
        permanent: false,
      },
    };
  }

  return typeof fn === 'function' ? await fn(ctx) : { props: {} };
}
