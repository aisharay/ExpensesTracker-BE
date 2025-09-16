#!/usr/bin/env python3
"""
Auto PR Raising Script for ExpenseTracker Backend
This script automates the process of creating Pull Requests for changes in the repository.
"""

import os
import sys
import subprocess
import json
import requests
from datetime import datetime
from typing import Optional, Dict, List
import argparse

class GitHubPRAutomator:
    def __init__(self, owner: str, repo: str, token: str):
        """
        Initialize the GitHub PR Automator
        
        Args:
            owner: GitHub username/organization
            repo: Repository name
            token: GitHub personal access token
        """
        self.owner = owner
        self.repo = repo
        self.token = token
        self.base_url = "https://api.github.com"
        self.headers = {
            "Authorization": f"token {token}",
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json"
        }

    def run_git_command(self, command: List[str]) -> str:
        """Run a git command and return the output"""
        try:
            result = subprocess.run(
                command, 
                capture_output=True, 
                text=True, 
                check=True,
                cwd=os.path.dirname(os.path.dirname(__file__))
            )
            return result.stdout.strip()
        except subprocess.CalledProcessError as e:
            print(f"❌ Git command failed: {' '.join(command)}")
            print(f"Error: {e.stderr}")
            sys.exit(1)

    def get_current_branch(self) -> str:
        """Get the current git branch"""
        return self.run_git_command(["git", "branch", "--show-current"])

    def get_changed_files(self) -> List[str]:
        """Get list of changed files"""
        # Get files that are different from main
        try:
            output = self.run_git_command(["git", "diff", "--name-only", "origin/main"])
            return output.split('\n') if output else []
        except:
            # If comparison with origin/main fails, get staged files
            output = self.run_git_command(["git", "diff", "--staged", "--name-only"])
            return output.split('\n') if output else []

    def get_commit_messages(self, base_branch: str = "main") -> List[str]:
        """Get commit messages since base branch"""
        try:
            output = self.run_git_command([
                "git", "log", f"origin/{base_branch}..HEAD", "--pretty=format:%s"
            ])
            return output.split('\n') if output else []
        except:
            return []

    def create_branch(self, branch_name: str) -> bool:
        """Create and switch to a new branch"""
        try:
            self.run_git_command(["git", "checkout", "-b", branch_name])
            return True
        except:
            print(f"⚠️ Branch {branch_name} might already exist, switching to it...")
            try:
                self.run_git_command(["git", "checkout", branch_name])
                return True
            except:
                return False

    def push_branch(self, branch_name: str) -> bool:
        """Push branch to origin"""
        try:
            self.run_git_command(["git", "push", "-u", "origin", branch_name])
            return True
        except:
            return False

    def generate_pr_title(self, changed_files: List[str], commit_messages: List[str]) -> str:
        """Generate a meaningful PR title"""
        if commit_messages and commit_messages[0]:
            return commit_messages[0]
        
        # Analyze changed files to generate title
        file_types = {
            'controllers': [],
            'models': [],
            'routes': [],
            'config': [],
            'middleware': [],
            'docs': []
        }
        
        for file in changed_files:
            if 'controller' in file.lower():
                file_types['controllers'].append(file)
            elif 'model' in file.lower():
                file_types['models'].append(file)
            elif 'route' in file.lower():
                file_types['routes'].append(file)
            elif 'config' in file.lower():
                file_types['config'].append(file)
            elif 'middleware' in file.lower():
                file_types['middleware'].append(file)
            elif 'readme' in file.lower() or 'doc' in file.lower():
                file_types['docs'].append(file)
        
        # Generate title based on changes
        if file_types['docs']:
            return "docs: Update documentation and README"
        elif file_types['config']:
            return "config: Update configuration files"
        elif file_types['controllers'] and file_types['routes']:
            return "feat: Add new API endpoints and controllers"
        elif file_types['controllers']:
            return "feat: Update API controllers"
        elif file_types['models']:
            return "feat: Update data models"
        elif file_types['routes']:
            return "feat: Update API routes"
        else:
            return f"feat: Update {len(changed_files)} files"

    def generate_pr_description(self, changed_files: List[str], commit_messages: List[str]) -> str:
        """Generate a comprehensive PR description"""
        description = "## 🚀 Changes Overview\n\n"
        
        if commit_messages:
            description += "### 📝 Commit Messages\n"
            for msg in commit_messages:
                if msg.strip():
                    description += f"- {msg}\n"
            description += "\n"
        
        description += "### 📁 Files Changed\n"
        for file in changed_files:
            if file.strip():
                # Determine change type based on file
                if any(keyword in file.lower() for keyword in ['controller', 'api']):
                    description += f"- 🔧 `{file}` - API Controller changes\n"
                elif 'model' in file.lower():
                    description += f"- 🗄️ `{file}` - Data model updates\n"
                elif 'route' in file.lower():
                    description += f"- 🛣️ `{file}` - API route changes\n"
                elif 'config' in file.lower():
                    description += f"- ⚙️ `{file}` - Configuration updates\n"
                elif 'middleware' in file.lower():
                    description += f"- 🔒 `{file}` - Middleware changes\n"
                elif 'readme' in file.lower():
                    description += f"- 📚 `{file}` - Documentation updates\n"
                else:
                    description += f"- 📄 `{file}`\n"
        
        description += "\n## 🧪 Testing\n"
        description += "- [ ] All existing tests pass\n"
        description += "- [ ] New functionality has been tested\n"
        description += "- [ ] API endpoints tested via Swagger\n\n"
        
        description += "## 📋 Checklist\n"
        description += "- [x] Code follows project style guidelines\n"
        description += "- [x] Self-review completed\n"
        description += "- [ ] Documentation updated if needed\n"
        description += "- [ ] No breaking changes introduced\n\n"
        
        description += "## 🔗 Related Issues\n"
        description += "<!-- Link any related issues here -->\n\n"
        
        description += f"**Generated automatically on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} 🤖**"
        
        return description

    def create_pull_request(self, 
                          title: str, 
                          description: str, 
                          head_branch: str, 
                          base_branch: str = "main") -> Optional[Dict]:
        """Create a pull request using GitHub API"""
        url = f"{self.base_url}/repos/{self.owner}/{self.repo}/pulls"
        
        data = {
            "title": title,
            "body": description,
            "head": head_branch,
            "base": base_branch
        }
        
        try:
            response = requests.post(url, headers=self.headers, data=json.dumps(data))
            
            if response.status_code == 201:
                return response.json()
            else:
                print(f"❌ Failed to create PR: {response.status_code}")
                print(f"Response: {response.text}")
                return None
                
        except Exception as e:
            print(f"❌ Error creating PR: {str(e)}")
            return None

    def auto_create_pr(self, feature_name: str = None, custom_title: str = None, custom_description: str = None):
        """Main method to automatically create a PR"""
        print("🚀 Starting Auto PR Creation Process...")
        
        current_branch = self.get_current_branch()
        print(f"📍 Current branch: {current_branch}")
        
        # If on main, create a new branch
        if current_branch == "main":
            if not feature_name:
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                feature_name = f"auto-pr-{timestamp}"
            
            branch_name = f"feature/{feature_name}"
            print(f"🌿 Creating new branch: {branch_name}")
            
            if not self.create_branch(branch_name):
                print("❌ Failed to create branch")
                return
            
            current_branch = branch_name
        
        # Get changed files
        changed_files = self.get_changed_files()
        if not changed_files or (len(changed_files) == 1 and not changed_files[0]):
            print("⚠️ No changes detected to create PR")
            return
        
        print(f"📁 Found {len(changed_files)} changed files")
        
        # Get commit messages
        commit_messages = self.get_commit_messages()
        
        # Generate PR content
        title = custom_title or self.generate_pr_title(changed_files, commit_messages)
        description = custom_description or self.generate_pr_description(changed_files, commit_messages)
        
        print(f"📝 PR Title: {title}")
        
        # Push branch if needed
        if current_branch != "main":
            print(f"⬆️ Pushing branch {current_branch}...")
            if not self.push_branch(current_branch):
                print("❌ Failed to push branch")
                return
        
        # Create PR
        print("🔄 Creating Pull Request...")
        pr_data = self.create_pull_request(title, description, current_branch)
        
        if pr_data:
            print("✅ Pull Request created successfully!")
            print(f"🔗 PR URL: {pr_data['html_url']}")
            print(f"📊 PR Number: #{pr_data['number']}")
        else:
            print("❌ Failed to create Pull Request")

def main():
    parser = argparse.ArgumentParser(description="Automatically create GitHub Pull Requests")
    parser.add_argument("--owner", default="aisharay", help="GitHub repository owner")
    parser.add_argument("--repo", default="ExpensesTracker-BE", help="Repository name")
    parser.add_argument("--token", help="GitHub personal access token")
    parser.add_argument("--feature", help="Feature name for branch creation")
    parser.add_argument("--title", help="Custom PR title")
    parser.add_argument("--description", help="Custom PR description")
    
    args = parser.parse_args()
    
    # Get token from environment if not provided
    token = args.token or os.getenv("GITHUB_TOKEN")
    
    if not token:
        print("❌ GitHub token is required!")
        print("Either provide --token argument or set GITHUB_TOKEN environment variable")
        print("\n📖 To create a GitHub token:")
        print("1. Go to GitHub Settings > Developer settings > Personal access tokens")
        print("2. Generate new token with 'repo' permissions")
        print("3. Set GITHUB_TOKEN environment variable or use --token")
        sys.exit(1)
    
    # Create automator instance
    automator = GitHubPRAutomator(args.owner, args.repo, token)
    
    # Create PR
    automator.auto_create_pr(args.feature, args.title, args.description)

if __name__ == "__main__":
    main()