import Nav from "./Nav";

export default function Layout({children}) {
  return(
    <div className="mx-6 p-2 md:max-w-3xl md:mx-auto">
      <Nav/>
      <main>{children}</main>
    </div>
  )
};
