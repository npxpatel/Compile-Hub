import {Globe, Upload, Settings, Code} from "lucide-react"

const Features = () =>{
    return (
        <div id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-pink-500 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Everything You Need to Build
            </p>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text sm:text-4xl">
              Intelligent Code
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
              Our platform provides all the tools you need to write, test, and share your code.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-pink-500 font-bold">
                98%
                <span className="text-xs block text-gray-500">Accuracy Rate</span>
              </div>
              <div className="inline-flex items-center justify-center p-3 bg-gray-800 rounded-lg text-pink-500 mb-4">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Website Integration</h3>
              <p className="mt-4 text-gray-400">
                Write code in multiple languages and compile it instantly. Get real-time feedback and error messages.
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-blue-500 font-bold">
                50+
                <span className="text-xs block text-gray-500">File Formats</span>
              </div>
              <div className="inline-flex items-center justify-center p-3 bg-gray-800 rounded-lg text-blue-500 mb-4">
                <Upload className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Document Processing</h3>
              <p className="mt-4 text-gray-400">
                Manage who can view and edit your code. Keep your work private or share it with specific collaborators.
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-purple-500 font-bold">
                100%
                <span className="text-xs block text-gray-500">Customizable</span>
              </div>
              <div className="inline-flex items-center justify-center p-3 bg-gray-800 rounded-lg text-purple-500 mb-4">
                <Settings className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Advanced Customization</h3>
              <p className="mt-4 text-gray-400">
                Set tone, personality, and system prompts to match your brand and coding style.
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-pink-500 font-bold">
                5min
                <span className="text-xs block text-gray-500">Setup Time</span>
              </div>
              <div className="inline-flex items-center justify-center p-3 bg-gray-800 rounded-lg text-pink-500 mb-4">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Simple Integration</h3>
              <p className="mt-4 text-gray-400">
                Share your code with unique IDs. Perfect for collaboration, code reviews, or showcasing your work.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Features