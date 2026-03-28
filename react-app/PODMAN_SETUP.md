# Podman Setup Guide for macOS

This guide explains how to set up and use Podman on macOS for deploying the Bob Lab application to IBM Code Engine.

## What is Podman?

Podman is a daemonless container engine for developing, managing, and running OCI Containers on Linux, macOS, and Windows. It's a drop-in replacement for Docker that doesn't require root privileges.

## Why Podman Machine on macOS?

On macOS, Podman requires a **Podman machine** (a lightweight Linux VM) to run containers because containers are Linux-based technology. The Podman machine provides the Linux environment needed to run containers on macOS.

## Installation

### Install Podman via Homebrew

```bash
brew install podman
```

### Verify Installation

```bash
podman --version
```

You should see output like: `podman version 5.8.1`

## Setting Up Podman Machine

### 1. Check Machine Status

```bash
podman machine list
```

**Expected output if no machine exists:**
```
NAME    VM TYPE    CREATED    LAST UP    CPUS    MEMORY    DISK SIZE
```

**Expected output if machine exists:**
```
NAME                     VM TYPE     CREATED      LAST UP            CPUS    MEMORY    DISK SIZE
podman-machine-default*  applehv     2 years ago  Currently running  4       2GiB      100GiB
```

### 2. Initialize Podman Machine (First Time Only)

If no machine exists, initialize one:

```bash
podman machine init
```

This creates a default Podman machine with:
- 4 CPUs
- 2GB RAM
- 100GB disk space

**Custom configuration (optional):**
```bash
podman machine init --cpus 4 --memory 4096 --disk-size 100
```

### 3. Start Podman Machine

```bash
podman machine start
```

**Expected output:**
```
Starting machine "podman-machine-default"
...
Machine "podman-machine-default" started successfully
```

### 4. Verify Podman is Working

```bash
podman info
```

You should see detailed information about your Podman installation and the running machine.

## Common Commands

### Check Machine Status
```bash
podman machine list
```

### Start Machine
```bash
podman machine start
```

### Stop Machine
```bash
podman machine stop
```

### Restart Machine
```bash
podman machine stop && podman machine start
```

### SSH into Machine (for debugging)
```bash
podman machine ssh
```

### Remove Machine
```bash
podman machine stop
podman machine rm
```

### View Machine Details
```bash
podman machine inspect
```

## Troubleshooting

### Issue: "Podman is not running"

**Solution:**
```bash
# Check if machine exists
podman machine list

# If machine exists but stopped, start it
podman machine start

# If no machine exists, initialize one
podman machine init
podman machine start
```

### Issue: "Cannot connect to Podman"

**Solution:**
```bash
# Restart the machine
podman machine stop
podman machine start

# Wait a few seconds for it to fully start
sleep 3

# Verify it's working
podman info
```

### Issue: Machine won't start

**Solution:**
```bash
# Check machine logs
podman machine inspect

# Try removing and recreating the machine
podman machine stop
podman machine rm
podman machine init
podman machine start
```

### Issue: "API forwarding" warnings

The warning about API forwarding is normal and can be ignored unless you need Docker API compatibility. If you want to install the helper:

```bash
sudo /opt/homebrew/Cellar/podman/5.8.1/bin/podman-mac-helper install
podman machine stop
podman machine start
```

### Issue: Out of disk space

**Solution:**
```bash
# Clean up unused images
podman image prune -a

# Or recreate machine with more space
podman machine stop
podman machine rm
podman machine init --disk-size 200
podman machine start
```

## Deployment Script Integration

The `deploy-with-apikey.sh` script now automatically:

1. **Checks if Podman is installed**
2. **Detects macOS and checks for Podman machine**
3. **Initializes machine if it doesn't exist**
4. **Starts machine if it's stopped**
5. **Waits for Podman to be ready**
6. **Proceeds with deployment**

You don't need to manually start the Podman machine before running the deployment script - it will handle it automatically!

## Best Practices

### 1. Keep Machine Running During Development

If you're actively developing and deploying:
```bash
# Start machine once
podman machine start

# Leave it running throughout your work session
# Stop it when done for the day
podman machine stop
```

### 2. Regular Cleanup

Clean up unused images periodically:
```bash
podman image prune -a
```

### 3. Monitor Resource Usage

Check machine resource usage:
```bash
podman machine inspect | grep -A 10 "Resources"
```

### 4. Update Podman Regularly

```bash
brew upgrade podman
```

After upgrading, restart the machine:
```bash
podman machine stop
podman machine start
```

## Docker Compatibility

Podman is compatible with Docker commands. You can create an alias:

```bash
# Add to ~/.zshrc or ~/.bashrc
alias docker=podman
```

However, note that Podman doesn't require a daemon and runs containers rootless by default, which is more secure.

## Additional Resources

- [Podman Official Documentation](https://docs.podman.io/)
- [Podman Desktop](https://podman-desktop.io/) - GUI for managing Podman
- [Podman Machine Documentation](https://docs.podman.io/en/latest/markdown/podman-machine.1.html)
- [IBM Cloud CLI Documentation](https://cloud.ibm.com/docs/cli)
- [IBM Code Engine Documentation](https://cloud.ibm.com/docs/codeengine)

## Quick Reference

```bash
# Essential commands
podman machine list              # Check status
podman machine start             # Start machine
podman machine stop              # Stop machine
podman info                      # Verify Podman is working
podman ps                        # List running containers
podman images                    # List images
podman image prune -a            # Clean up all unused images

# Deployment
cd react-app
./deploy-with-apikey.sh          # Deploy (auto-starts Podman machine)
```

## Support

If you encounter issues not covered in this guide:

1. Check Podman logs: `podman machine inspect`
2. Restart the machine: `podman machine stop && podman machine start`
3. Check the [Podman GitHub Issues](https://github.com/containers/podman/issues)
4. Consult the deployment script logs for specific error messages

---

**Note:** The deployment script has been updated to automatically handle Podman machine startup on macOS. You should rarely need to manually manage the Podman machine unless troubleshooting specific issues.