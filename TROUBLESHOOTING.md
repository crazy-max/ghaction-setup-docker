# Troubleshooting

## macOS: `qemu[stderr]: qemu-system-x86_64: Unknown Error`

Colima may fail to start with the following error:

```
time="2023-08-26T06:30:33Z" level=info msg="[hostagent] Starting QEMU (hint: to watch the boot progress, see \"/Users/runner/.lima/colima/serial*.log\")"
time="2023-08-26T06:30:34Z" level=info msg="SSH Local Port: 49209"
time="2023-08-26T06:30:34Z" level=info msg="[hostagent] Waiting for the essential requirement 1 of 3: \"ssh\""
time="2023-08-26T06:30:34Z" level=info msg="[hostagent] Driver stopped due to error: \"exit status 255\""
time="2023-08-26T06:30:34Z" level=info msg="[hostagent] Shutting down the host agent"
time="2023-08-26T06:30:34Z" level=warning msg="[hostagent] failed to exit SSH master"
time="2023-08-26T06:30:34Z" level=info msg="[hostagent] Shutting down QEMU with ACPI"
time="2023-08-26T06:30:34Z" level=warning msg="[hostagent] failed to open the QMP socket \"/Users/runner/.lima/colima/qmp.sock\", forcibly killing QEMU"
time="2023-08-26T06:30:34Z" level=info msg="[hostagent] QEMU has already exited"
time="2023-08-26T06:30:34Z" level=fatal msg="exiting, status={Running:false Degraded:false Exiting:true Errors:[] SSHLocalPort:0} (hint: see \"/Users/runner/.lima/colima/ha.stderr.log\")"
time="2023-08-26T06:30:34Z" level=fatal msg="error starting vm: error at 'creating and starting': exit status 1"
```

```
{"level":"debug","msg":"executing [ssh-keygen -t ed25519 -q -N  -f /Users/runner/.lima/_config/user]","time":"2023-08-26T07:16:40Z"}
{"level":"debug","msg":"Creating iso file /Users/runner/.lima/colima/cidata.iso","time":"2023-08-26T07:16:41Z"}
{"level":"debug","msg":"Using /var/folders/24/8k48jl6d249_n_qfxwsl6xvm0000gn/T/diskfs_iso3418167253 as workspace","time":"2023-08-26T07:16:41Z"}
{"level":"debug","msg":"OpenSSH version 8.6.1 detected","time":"2023-08-26T07:16:41Z"}
{"level":"debug","msg":"AES accelerator seems available, prioritizing aes128-gcm@openssh.com and aes256-gcm@openssh.com","time":"2023-08-26T07:16:41Z"}
{"level":"debug","msg":"QEMU version 8.0.4 detected","time":"2023-08-26T07:16:43Z"}
{"level":"debug","msg":"firmware candidates = [/Users/runner/.local/share/qemu/edk2-x86_64-code.fd /Users/runner/.colima/_wrapper/4e1b408f843d1c63afbbdcf80c40e4c88d33509f/share/qemu/edk2-x86_64-code.fd /usr/share/OVMF/OVMF_CODE.fd /usr/share/qemu/ovmf-x86_64-code.bin /usr/share/edk2-ovmf/x64/OVMF_CODE.fd]","time":"2023-08-26T07:16:43Z"}
{"level":"info","msg":"Starting QEMU (hint: to watch the boot progress, see \"/Users/runner/.lima/colima/serial*.log\")","time":"2023-08-26T07:16:43Z"}
{"level":"debug","msg":"qCmd.Args: [/Users/runner/.colima/_wrapper/4e1b408f843d1c63afbbdcf80c40e4c88d33509f/bin/qemu-system-x86_64 -m 2048 -cpu host,-pdpe1gb -machine q35,accel=hvf -smp 2,sockets=1,cores=2,threads=1 -drive if=pflash,format=raw,readonly=on,file=/Users/runner/.colima/_wrapper/4e1b408f843d1c63afbbdcf80c40e4c88d33509f/share/qemu/edk2-x86_64-code.fd -boot order=d,splash-time=0,menu=on -drive file=/Users/runner/.lima/colima/basedisk,format=raw,media=cdrom,readonly=on -drive file=/Users/runner/.lima/colima/diffdisk,if=virtio,discard=on -drive id=cdrom0,if=none,format=raw,readonly=on,file=/Users/runner/.lima/colima/cidata.iso -device virtio-scsi-pci,id=scsi0 -device scsi-cd,bus=scsi0.0,drive=cdrom0 -netdev user,id=net0,net=192.168.5.0/24,dhcpstart=192.168.5.15,hostfwd=tcp:127.0.0.1:49168-:22 -device virtio-net-pci,netdev=net0,mac=52:55:55:be:6e:dd -device virtio-rng-pci -display none -device virtio-vga -device virtio-keyboard-pci -device virtio-mouse-pci -device qemu-xhci,id=usb-bus -parallel none -chardev socket,id=char-serial,path=/Users/runner/.lima/colima/serial.sock,server=on,wait=off,logfile=/Users/runner/.lima/colima/serial.log -serial chardev:char-serial -chardev socket,id=char-serial-virtio,path=/Users/runner/.lima/colima/serialv.sock,server=on,wait=off,logfile=/Users/runner/.lima/colima/serialv.log -device virtio-serial-pci,id=virtio-serial0,max_ports=1 -device virtconsole,chardev=char-serial-virtio,id=console0 -virtfs local,mount_tag=mount0,path=/Users/runner,security_model=none -virtfs local,mount_tag=mount1,path=/tmp/colima,security_model=none -chardev socket,id=char-qmp,path=/Users/runner/.lima/colima/qmp.sock,server=on,wait=off -qmp chardev:char-qmp -name lima-colima -pidfile /Users/runner/.lima/colima/qemu.pid]","time":"2023-08-26T07:16:43Z"}
{"level":"info","msg":"Waiting for the essential requirement 1 of 3: \"ssh\"","time":"2023-08-26T07:16:43Z"}
{"level":"debug","msg":"executing script \"ssh\"","time":"2023-08-26T07:16:43Z"}
{"level":"debug","msg":"executing ssh for script \"ssh\": /usr/bin/ssh [ssh -F /dev/null -o IdentityFile=\"/Users/runner/.lima/_config/user\" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o NoHostAuthenticationForLocalhost=yes -o GSSAPIAuthentication=no -o PreferredAuthentications=publickey -o Compression=no -o BatchMode=yes -o IdentitiesOnly=yes -o Ciphers=\"^aes128-gcm@openssh.com,aes256-gcm@openssh.com\" -o User=runner -o ControlMaster=auto -o ControlPath=\"/Users/runner/.lima/colima/ssh.sock\" -o ControlPersist=5m -p 49168 127.0.0.1 -- /bin/bash]","time":"2023-08-26T07:16:43Z"}
{"level":"debug","msg":"stdout=\"\", stderr=\"ssh: connect to host 127.0.0.1 port 49168: Connection refused\\r\\n\", err=failed to execute script \"ssh\": stdout=\"\", stderr=\"ssh: connect to host 127.0.0.1 port 49168: Connection refused\\r\\n\": exit status 255","time":"2023-08-26T07:16:43Z"}
{"level":"debug","msg":"qemu[stderr]: qemu-system-x86_64: Unknown Error","time":"2023-08-26T07:16:43Z"}
{"level":"info","msg":"Driver stopped due to error: \"exit status 255\"","time":"2023-08-26T07:16:43Z"}
{"level":"info","msg":"Shutting down the host agent","time":"2023-08-26T07:16:44Z"}
{"level":"debug","msg":"shutting down the SSH master","time":"2023-08-26T07:16:44Z"}
{"level":"debug","msg":"executing ssh for exiting the master: /usr/bin/ssh [ssh -F /dev/null -o IdentityFile=\"/Users/runner/.lima/_config/user\" -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o NoHostAuthenticationForLocalhost=yes -o GSSAPIAuthentication=no -o PreferredAuthentications=publickey -o Compression=no -o BatchMode=yes -o IdentitiesOnly=yes -o Ciphers=\"^aes128-gcm@openssh.com,aes256-gcm@openssh.com\" -o User=runner -o ControlMaster=auto -o ControlPath=\"/Users/runner/.lima/colima/ssh.sock\" -o ControlPersist=5m -O exit -p 49168 127.0.0.1]","time":"2023-08-26T07:16:44Z"}
{"error":"failed to execute `ssh -O exit -p 49168 127.0.0.1`, out=\"Control socket connect(/Users/runner/.lima/colima/ssh.sock): No such file or directory\\r\\n\": exit status 255","level":"warning","msg":"failed to exit SSH master","time":"2023-08-26T07:16:44Z"}
{"level":"info","msg":"Shutting down QEMU with ACPI","time":"2023-08-26T07:16:44Z"}
{"error":"dial unix /Users/runner/.lima/colima/qmp.sock: connect: connection refused","level":"warning","msg":"failed to open the QMP socket \"/Users/runner/.lima/colima/qmp.sock\", forcibly killing QEMU","time":"2023-08-26T07:16:44Z"}
{"level":"info","msg":"QEMU has already exited","time":"2023-08-26T07:16:44Z"}
```

To fix this issue you can replace the existing signature of QEMU binary with
the required entitlements as suggested in https://github.com/abiosoft/colima/issues/786#issuecomment-1693629650.
This can be done within this action by setting the env var `SIGN_QEMU_BINARY=1`:

```yaml
      -
        name: Set up Docker
        uses: crazy-max/ghaction-setup-docker@v2
        env:
          SIGN_QEMU_BINARY: 1
```
