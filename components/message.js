export default function Message({children, avatar, description, username}) {
  return (
    <div className="bg-white py-8 px-4 border-b-2 rounded-lg">
      <div className="flex items-center">
        <img className="w-10 rounded-full mr-1" src={avatar} alt=""/>
        <h1 className="font-medium">{username}</h1>
      </div>
      <div className="pt-4 text-stone-700	">
        <p>{description} </p>
      </div>
      {children}
    </div>
  )
};
