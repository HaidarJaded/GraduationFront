import NextLink from "next/link";

function Link({ href, children, ...props }) {
  return (
    <NextLink href={href}>
      <span {...props}>{children}</span>
    </NextLink>
  );
}

export { Link };
