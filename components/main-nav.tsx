"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Главная',
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'С кем работаем',
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'Категории',
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/meats`,
      label: 'Мясо',
      active: pathname === `/${params.storeId}/meats`,
    },
    {
      href: `/${params.storeId}/products`,
      label: 'Товары',
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/sections`,
      label: 'Секция',
      active: pathname === `/${params.storeId}/sections`,
    },
    {
      href: `/${params.storeId}/places`,
      label: 'Места',
      active: pathname === `/${params.storeId}/places`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: 'Заказы',
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Настройки',
      active: pathname === `/${params.storeId}/settings`,
    },
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
  )
};
