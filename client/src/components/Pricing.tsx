import {ChevronRight} from "lucide-react"

const Pricing = () =>{
    return (
        <div id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-pink-500 font-semibold tracking-wide uppercase">Pricing</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Plans for every developer
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
              Choose the plan that fits your needs. All plans include our core features.
            </p>
          </div>

          <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
            <div className="relative p-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-xl flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">Hobby</h3>
                <p className="mt-4 flex items-baseline text-white">
                  <span className="text-5xl font-extrabold tracking-tight">$0</span>
                  <span className="ml-1 text-xl font-semibold text-gray-400">/month</span>
                </p>
                <p className="mt-6 text-gray-400">Perfect for hobbyists and students.</p>

                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <ChevronRight className="h-5 w-5 text-pink-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-400">5 active projects</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <ChevronRight className="h-5 w-5 text-pink-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-400">Basic compiler options</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <ChevronRight className="h-5 w-5 text-pink-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-400">Public sharing</p>
                  </li>
                </ul>
              </div>

              <button className="mt-8 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-700 transition-colors">
                Get started
              </button>
            </div>

            <div className="relative p-8 bg-gradient-to-b from-gray-900 to-gray-900 border border-pink-500 rounded-2xl shadow-xl flex flex-col">
              <div className="absolute top-0 right-6 -translate-y-1/2 transform">
                <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-gradient-to-r from-pink-500 to-pink-600 text-white">
                  Popular
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">Pro</h3>
                <p className="mt-4 flex items-baseline text-white">
                  <span className="text-5xl font-extrabold tracking-tight">$15</span>
                  <span className="ml-1 text-xl font-semibold text-gray-400">/month</span>
                </p>
                <p className="mt-6 text-gray-400">For professional developers and small teams.</p>

                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <ChevronRight className="h-5 w-5 text-pink-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-400">Unlimited projects</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <ChevronRight className="h-5 w-5 text-pink-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-400">Advanced compiler options</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <ChevronRight className="h-5 w-5 text-pink-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-400">Private sharing with access control</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <ChevronRight className="h-5 w-5 text-pink-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-400">Collaboration features</p>
                  </li>
                </ul>
              </div>

              <button className="mt-8 block w-full bg-gradient-to-r from-pink-500 to-pink-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:from-pink-600 hover:to-pink-700 transition-all">
                Get started
              </button>
            </div>

            <div className="relative p-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-xl flex flex-col">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">Enterprise</h3>
                <p className="mt-4 flex items-baseline text-white">
                  <span className="text-5xl font-extrabold tracking-tight">$49</span>
                  <span className="ml-1 text-xl font-semibold text-gray-400">/month</span>
                </p>
                <p className="mt-6 text-gray-400">For organizations with advanced needs.</p>

                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <ChevronRight className="h-5 w-5 text-pink-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-400">Everything in Pro</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <ChevronRight className="h-5 w-5 text-pink-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-400">SSO Authentication</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <ChevronRight className="h-5 w-5 text-pink-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-400">Advanced security features</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <ChevronRight className="h-5 w-5 text-pink-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-400">Dedicated support</p>
                  </li>
                </ul>
              </div>

              <button className="mt-8 block w-full bg-gray-800 border border-gray-700 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-700 transition-colors">
                Contact sales
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Pricing;