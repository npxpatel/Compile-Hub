import {Code2, Github} from "lucide-react"

const Footer = () => {
    return (
        <footer className="bg-gray-950 border-t border-gray-800">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                  
                  <div className="border-t border-gray-800 pt-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-pink-600 rounded-lg p-2">
                          <Code2 className="h-6 w-6 text-white" />
                        </div>
                        <span className="ml-2 text-xl font-bold text-white">CodeFlow</span>
                      </div>
                      <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-gray-300">
                          <span className="sr-only">Twitter</span>
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-300">
                          <span className="sr-only">GitHub</span>
                          <Github className="h-6 w-6" />
                        </a>
                      </div>
                    </div>
                    <p className="mt-8 text-base text-gray-400 md:mt-4">
                      &copy; 2025 CodeFlow, Inc. All rights reserved.
                    </p>
                  </div>
                </div>
              </footer>
    )
}

export default Footer