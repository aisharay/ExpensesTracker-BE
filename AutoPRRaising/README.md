# Auto PR Raising Tool 🤖

This tool automatically creates Pull Requests for your ExpenseTracker Backend changes using the GitHub API.

## 🚀 Features

- **Smart Branch Creation**: Automatically creates feature branches if you're on main
- **Intelligent PR Titles**: Generates meaningful titles based on changed files and commits
- **Comprehensive Descriptions**: Creates detailed PR descriptions with file changes analysis
- **Git Integration**: Seamlessly works with your existing Git workflow
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Customizable**: Supports custom titles, descriptions, and branch names

## 📋 Prerequisites

1. **Python 3.7+** installed on your system
2. **Git** configured with your repository
3. **GitHub Personal Access Token** with `repo` permissions

## 🔧 Setup

### 1. Create GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "ExpenseTracker Auto PR")
4. Select the `repo` scope (full repository access)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)

### 2. Set Environment Variable

**Windows (PowerShell):**
```powershell
$env:GITHUB_TOKEN = "your_token_here"
# Or set permanently:
[System.Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "your_token_here", "User")
```

**Windows (Command Prompt):**
```cmd
set GITHUB_TOKEN=your_token_here
```

**macOS/Linux:**
```bash
export GITHUB_TOKEN="your_token_here"
# Add to ~/.bashrc or ~/.zshrc for persistence:
echo 'export GITHUB_TOKEN="your_token_here"' >> ~/.bashrc
```

### 3. Install Dependencies

```bash
cd AutoPRRaising
pip install -r requirements.txt
```

## 🎯 Usage

### Quick Start (Windows)

**Option 1: PowerShell Script**
```powershell
.\AutoPRRaising\run_auto_pr.ps1
```

**Option 2: Batch Script**
```cmd
AutoPRRaising\run_auto_pr.bat
```

### Manual Python Execution

```bash
python AutoPRRaising/main.py
```

### Advanced Usage

**Custom feature name:**
```bash
python AutoPRRaising/main.py --feature "user-authentication"
```

**Custom PR title:**
```bash
python AutoPRRaising/main.py --title "feat: Add JWT authentication system"
```

**Custom description:**
```bash
python AutoPRRaising/main.py --description "Implements secure JWT-based authentication"
```

**Different repository:**
```bash
python AutoPRRaising/main.py --owner "username" --repo "repository-name"
```

**Provide token directly:**
```bash
python AutoPRRaising/main.py --token "ghp_your_token_here"
```

## 🔄 Workflow

1. **Make your changes** to the codebase
2. **Commit your changes** (optional but recommended for better PR descriptions)
3. **Run the auto PR script**
4. **Review the created PR** on GitHub
5. **Merge when ready**

## 📊 What the Script Does

### Automatic Detection
- ✅ Detects changed files since the last main branch
- ✅ Analyzes file types (controllers, models, routes, etc.)
- ✅ Reads commit messages for context
- ✅ Determines current Git branch

### Smart Branch Management
- 🌿 Creates a new feature branch if you're on main
- 🌿 Uses existing branch if you're already on a feature branch
- 🌿 Pushes branch to origin automatically

### Intelligent PR Content
- 📝 Generates meaningful titles based on changes
- 📝 Creates comprehensive descriptions with:
  - Overview of changes
  - List of modified files with descriptions
  - Testing checklist
  - Review checklist
  - Timestamp of creation

### Example Generated PR Description

```markdown
## 🚀 Changes Overview

### 📝 Commit Messages
- feat: Add user authentication endpoints
- fix: Update JWT token validation

### 📁 Files Changed
- 🔧 `src/controllers/userController.js` - API Controller changes
- 🛣️ `src/routes/userRoutes.js` - API route changes
- 🔒 `src/middleware/authMiddleware.js` - Middleware changes

## 🧪 Testing
- [ ] All existing tests pass
- [ ] New functionality has been tested
- [ ] API endpoints tested via Swagger

## 📋 Checklist
- [x] Code follows project style guidelines
- [x] Self-review completed
- [ ] Documentation updated if needed
- [ ] No breaking changes introduced

## 🔗 Related Issues
<!-- Link any related issues here -->

**Generated automatically on 2025-09-16 14:30:25 🤖**
```

## 🔍 Command Line Options

| Option | Description | Default |
|--------|-------------|---------|
| `--owner` | GitHub repository owner | `aisharay` |
| `--repo` | Repository name | `ExpensesTracker-BE` |
| `--token` | GitHub personal access token | From `GITHUB_TOKEN` env var |
| `--feature` | Custom feature name for branch | Auto-generated timestamp |
| `--title` | Custom PR title | Auto-generated from changes |
| `--description` | Custom PR description | Auto-generated comprehensive desc |

## 🔧 Troubleshooting

### Common Issues

**❌ "GitHub token is required!"**
- Make sure `GITHUB_TOKEN` environment variable is set
- Or provide token with `--token` parameter

**❌ "No changes detected to create PR"**
- Make sure you have uncommitted changes or commits ahead of main
- Check if you're in the right Git repository

**❌ "Failed to create branch"**
- Branch might already exist, the script will try to switch to it
- Make sure you have write permissions to the repository

**❌ "Failed to push branch"**
- Check your Git credentials
- Make sure you have push permissions to the repository

**❌ "Failed to create PR: 422"**
- PR might already exist for this branch
- Check GitHub for existing PRs

### Debug Mode

Add print statements or use verbose Git output:
```bash
python AutoPRRaising/main.py --feature "debug-test"
```

## 🛠️ Customization

### Modify PR Templates

Edit the `generate_pr_description()` method in `main.py` to customize:
- PR description format
- Checklist items
- File type categorization
- Additional sections

### Add New File Types

Update the `generate_pr_title()` method to recognize new file patterns:
```python
file_types = {
    'controllers': [],
    'models': [],
    'routes': [],
    'config': [],
    'middleware': [],
    'docs': [],
    'tests': [],  # Add new category
    'utils': []   # Add new category
}
```

## 📝 License

This tool is part of the ExpenseTracker Backend project and follows the same license.

## 🤝 Contributing

Feel free to improve this tool by:
1. Adding new features
2. Improving error handling
3. Adding more file type detection
4. Enhancing PR templates

---

**Happy Coding! 🚀**
