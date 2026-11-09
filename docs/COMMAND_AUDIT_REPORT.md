# Motion Graphics Studio — Command Authorization & Sandbox Audit Report

> **Date**: 2026-11-09  
> **Workspace**: `C:\Dev\science-video-lab` (Planned migration: `C:\Dev\motion-graphics-studio`)  
> **Target Machine**: Windows 11 Home/Pro (x64), NVIDIA GeForce RTX 4070 (8 GB VRAM)  
> **Audit Status**: ✅ Complete & Verified  

---

## 1. Executive Summary

This audit evaluates the execution behavior, security boundaries, and authorization classifications for all development, rendering, neural speech, and quality assurance commands in **Motion Graphics Studio**.

A critical operational finding was discovered and verified regarding Remotion tooling inside Antigravity's standard Windows sandbox:
- **Sandbox Limitation**: Remotion's composition discovery (`npx remotion compositions`), video rendering (`render.ps1`), and interactive preview (`preview.ps1`) require internal Chrome DevTools Protocol (CDP) WebSocket communication with headless Chrome on loopback address `127.0.0.1`. In Antigravity's Standard Sandbox Mode, all outgoing connections to `127.0.0.1` are blocked by the sandbox network filter with `connect EACCES 127.0.0.1:<port>` (errno `-4092`).
- **Unsandboxed Success**: When executed outside the sandbox (`BypassSandbox: true`), the exact same command succeeded cleanly with exit code `0`, discovering both registered compositions (`SunDisappearsShort` and `SunAnimation`) in under 25 seconds.
- **Enforced Security Policy**: Sandboxing must **never** be disabled globally. Instead, a strict principle of least privilege is applied: only the specific Remotion commands requiring local CDP socket communication may request Antigravity's native per-command user approval dialog (`BypassSandbox: true`). All other operations (static typechecking, Python CUDA neural TTS, FFmpeg QA, file writes, Git inspections) remain strictly sandboxed.

---

## 2. Technical Investigation & Root Cause Proof

### 2.1 The Sandbox Failure Mode
During sandboxed execution of `npx remotion compositions src/index.ts`:
1. Remotion successfully bundled `src/index.ts` via Webpack in **3,231 ms** to `.tmp` / system temp.
2. Remotion verified the locally cached Chrome Headless Shell binary at `node_modules\.remotion\chrome-headless-shell\win64\chrome-headless-shell.exe`.
3. Remotion spawned `chrome-headless-shell.exe` with `--remote-debugging-port=0`, which bound to an ephemeral loopback port (e.g. `127.0.0.1:57958`).
4. Remotion's Node.js process attempted to connect via WebSocket:
   ```text
   ws://127.0.0.1:57958/devtools/browser/8a9b1861-882e-4228-965e-47cb3b7032af
   ```
5. Windows sandbox network isolation intercepted and denied the TCP handshake, emitting:
   ```text
   Error: connect EACCES 127.0.0.1:57958
       at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1607:16) {
     errno: -4092,
     code: 'EACCES',
     syscall: 'connect',
     address: '127.0.0.1',
     port: 57958
   }
   ```
6. In unhandled diagnostic execution, the Node event loop remained open waiting on pending socket retry handles, causing a hang until explicitly terminated.

### 2.2 Empirical Proof: Loopback TCP Isolation Test
To isolate whether the issue was Remotion-specific or a general sandbox restriction, a minimal Node.js script was executed (`net.createServer` listening on `127.0.0.1:0` + `net.connect`):

- **Inside Sandbox (`BypassSandbox: false`)**:
  ```text
  Server listening on 127.0.0.1:42949
  Client connection error: EACCES connect EACCES 127.0.0.1:42949
  ```
  *Result*: Listening succeeds, but client connection is blocked with `EACCES`.

- **Outside Sandbox (`BypassSandbox: true`)**:
  ```text
  Server listening on 127.0.0.1:43048
  Client connected successfully
  ```
  *Result*: Clean connection, exit code 0.

### 2.3 Unsandboxed Verification: Composition Discovery
With single-command bypass and bounded execution:
```powershell
npx remotion compositions src/index.ts
```
**Output (Exit Code 0, ~20 seconds)**:
```text
Bundling code        ━━━━━━━━━━━━━━━━━━ 100%
Bundled code         ━━━━━━━━━━━━━━━━━━ 4818ms

The following compositions are available:

SunDisappearsShort    30      1080x1920      900 (30.00 sec)
SunAnimation          30      1080x1920      90 (3.00 sec)
```

---

## 3. Comprehensive Command Authorization Audit Matrix

| Command | Purpose | Sandboxed Behavior | Required Permissions | Risk Level | Authorization Status |
| :--- | :--- | :--- | :--- | :---: | :--- |
| `nvidia-smi` | GPU & VRAM audit | ✅ Works in sandbox | Standard Sandbox | Low | **Preauthorized** |
| `node -v; npm -v` | Toolchain versions | ✅ Works in sandbox | Standard Sandbox | Low | **Preauthorized** |
| `git status` / `git diff` | Working tree check | ✅ Works in sandbox | Standard Sandbox | Low | **Preauthorized** |
| `git add <files>` | Stage changes | ✅ Works in sandbox | Standard Sandbox | Low | **Preauthorized** |
| `git commit -m "..."` | Local Git commit | ✅ Works in sandbox | Standard Sandbox | Low | **Preauthorized** |
| `npx tsc --noEmit` | Static typecheck | ✅ Works in sandbox | Standard Sandbox | Low | **Preauthorized** |
| `npm ci` | Lockfile install | ✅ Works in sandbox | Standard Sandbox | Low | **Preauthorized** |
| `.\scripts\tts.ps1` | Kokoro CUDA voice | ✅ Works in sandbox | Standard Sandbox | Low | **Preauthorized** |
| `.\.venv\Scripts\python.exe` | PyTorch CUDA test | ✅ Works in sandbox | Standard Sandbox | Low | **Preauthorized** |
| `ffprobe ...` | Stream analysis | ✅ Works in sandbox | Standard Sandbox | Low | **Preauthorized** |
| `ffmpeg -af volumedetect` | Audio loudness QA | ✅ Works in sandbox | Standard Sandbox | Low | **Preauthorized** |
| `ffmpeg -vf blackdetect` | Black frame QA | ✅ Works in sandbox | Standard Sandbox | Low | **Preauthorized** |
| `ffmpeg -vf tile ...` | Contact sheet QA | ✅ Works in sandbox | Standard Sandbox | Low | **Preauthorized** |
| `npx remotion compositions` | Discover compositions | ❌ Blocked (`EACCES 127.0.0.1`) | **Per-command native approval (`BypassSandbox: true`)** | Low | **Conditional / Approved** |
| `.\scripts\render.ps1` | Video render (MP4) | ❌ Blocked (`EACCES 127.0.0.1`) | **Per-command native approval (`BypassSandbox: true`)** | Low | **Conditional / Approved** |
| `.\scripts\preview.ps1` | Remotion Studio UI | ❌ Blocked (`EACCES 127.0.0.1`) | **Per-command native approval (`BypassSandbox: true`)** | Low | **Conditional / Approved** |
| `git push origin main` | Remote sync | High risk (Remote) | Explicit human approval required | High | **Gate: Never Autonomous** |
| `git reset --hard` | Wipe working tree | Destructive | Explicit human approval required | High | **Gate: Prohibited** |

---

## 4. Policy for Least Privilege Execution

To maintain maximum security while allowing Remotion workflows to function:

1. **Default to Standard Sandbox**: Every diagnostic, typecheck, audio generation, and file edit must attempt to run in standard sandboxed mode first.
2. **Narrow Unsandboxed Scope**: Only commands that strictly require local Chrome DevTools Protocol socket connections (`npx remotion compositions`, `render.ps1`, `preview.ps1`) may request `BypassSandbox: true`.
3. **No Global Disabling**: Sandboxing must never be disabled globally, nor may blanket permission grants be created.
4. **Bounded Timeouts**: Diagnostic and render commands should enforce sensible timeouts (e.g. 30–60 seconds for discovery, appropriate budgets for rendering) to prevent hanging if background handles fail to close cleanly.
5. **Zero Process Lingering**: After command completion or termination, verify no detached Chrome Headless Shell processes remain running.

---

## 5. Lightweight Regression Verification

The following verification suite was run after applying the policy documentation updates:

1. **TypeScript Typecheck**:
   ```powershell
   npx tsc --noEmit
   ```
   *Result*: **0 errors**. Type definitions across all components, scenes, productions, and Root compositions remain 100% compliant.

2. **Python Virtual Environment & PyTorch CUDA**:
   ```powershell
   .\.venv\Scripts\python.exe -c "import torch; print(torch.cuda.is_available())"
   ```
   *Result*: `True` on `NVIDIA GeForce RTX 4070 Laptop GPU`.

3. **Neural TTS Script CLI**:
   ```powershell
   .\.venv\Scripts\python.exe scripts\generate_neural_tts.py --help
   ```
   *Result*: Help message returned cleanly with exit code 0.

4. **Remotion Composition Registration**:
   Verified that both compositions (`SunDisappearsShort` and `SunAnimation`) remain discoverable.

5. **Process Hygiene**:
   Confirmed zero running background `chrome-headless-shell` or `remotion` instances.

6. **Safety Gates Confirmation**:
   - No remote push (`git push`) was executed.
   - No folder renames or moves were performed.
   - Phase 4 documentary rendering has not been started.
