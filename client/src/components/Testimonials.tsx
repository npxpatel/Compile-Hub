const Testimonials = () =>{
    return (
        <div className="bg-gradient-to-r from-pink-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white">Loved by developers worldwide</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800">
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-white">Sarah Chen</h4>
                  <p className="text-gray-400">Frontend Developer</p>
                </div>
              </div>
              <p className="mt-4 text-gray-300">
                "CodeFlow has completely transformed how I share code with my team. The access control features are exactly what I needed."
              </p>
            </div>

            <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800">
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-white">Marcus Johnson</h4>
                  <p className="text-gray-400">Full Stack Developer</p>
                </div>
              </div>
              <p className="mt-4 text-gray-300">
                "I use CodeFlow daily for teaching coding concepts. The ability to share code with unique IDs makes it perfect for my students."
              </p>
            </div>

            <div className="bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-800">
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-white">Alicia Torres</h4>
                  <p className="text-gray-400">Software Engineer</p>
                </div>
              </div>
              <p className="mt-4 text-gray-300">
                "The compilation speed is impressive. I can quickly test ideas and share them with my team without any hassle."
              </p>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Testimonials