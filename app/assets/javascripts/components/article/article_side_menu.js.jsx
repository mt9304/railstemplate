class ArticleSideMenu extends React.Component{
	
	constructor(props){
		super(props);
		this.state = props;
	}

	render () {
		return (
		<nav id="sidebar">
            <div className="sidebar-header">
                <h3>Table of Contents</h3>
            </div>

            <ul className="list-unstyled components">
                <p className="ta-menu-header">0. Introduction</p>
                <li className="">
                    <a href="#homeSubmenu">Purpose</a>
                </li>

                <p className="ta-menu-header">1. The Basics</p>
                <li className="">
                    <a href="#homeSubmenu">The Internet And Technology</a>
                </li>
                <li className="">
                    <a href="#homeSubmenu">Programming And Testing</a>
                </li>
                <li className="">
                    <a href="#homeSubmenu">Tools</a>
                </li>
                <li className="">
                    <a href="#homeSubmenu">Databases</a>
                </li>
                <li className="">
                    <a href="#homeSubmenu">Web Servers</a>
                </li>
                <li className="">
                    <a href="#homeSubmenu">Troubleshooting</a>
                </li>

                <p className="ta-menu-header">2. Building The Project</p>
                <li className="">
                    <a href="#homeSubmenu">Ruby on Rails</a>
                </li>
                <li className="">
                    <a href="#homeSubmenu">Authentication</a>
                </li>
                <li className="">
                    <a href="#homeSubmenu">Authorization</a>
                </li>
                <li className="">
                    <a href="#homeSubmenu">React</a>
                </li>

                <p className="ta-menu-header">3. Important Theories</p>
                <li className="">
                    <a href="#homeSubmenu">Big O</a>
                </li>
                <li className="">
                    <a href="#homeSubmenu">Data Structures And Algorithms</a>
                </li>
                <li className="">
                    <a href="#homeSubmenu">OO and Design Patterns</a>
                </li>
                <li className="">
                    <a href="#homeSubmenu">Frameworks and Architecture</a>
                </li>

                <p className="ta-menu-header">4. To Production</p>
                <li className="">
                    <a href="#homeSubmenu">Domains</a>
                </li>
                <li className="">
                    <a href="#homeSubmenu">Hosting (AWS/Heroku)</a>
                </li>
                <li className="">
                    <a href="#homeSubmenu">Web Server (Nginx)</a>
                </li>
                <li className="">
                    <a href="#homeSubmenu">Scripting (Bash)</a>
                </li>
                <li className="">
                    <a href="#homeSubmenu">Caching and CDNs</a>
                </li>
                <li className="">
                    <a href="#homeSubmenu">Disaster Recovery (Backups)</a>
                </li>
                <li className="">
                    <a href="#homeSubmenu">Let's Encrypt (SSL)</a>
                </li>

                <p className="ta-menu-header">5. Post Production</p>
                <li className="">
                    <a href="#homeSubmenu">SEO</a>
                </li>
                <li className="">
                    <a href="#homeSubmenu">Google Analytics</a>
                </li>
                <li className="">
                    <a href="#homeSubmenu">Email Domains</a>
                </li>

				<p className="ta-menu-header">Next Steps</p>
                <li className="">
                    <a href="#homeSubmenu">Thoughts And Prayers</a>
                </li>
            </ul>

            <ul className="list-unstyled CTAs">
                <li>
                    <a href="https://bootstrapious.com/tutorial/files/sidebar.zip">Article Search</a>
                </li>
                <li>
                    <a href="https://bootstrapious.com/p/bootstrap-sidebar">Back To Article List</a>
                </li>
            </ul>
        </nav>
		)
	}
}