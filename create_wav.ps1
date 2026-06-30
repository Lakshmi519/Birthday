# Create a valid WAV file
[byte[]]$wavFile = @(
    # RIFF header
    0x52, 0x49, 0x46, 0x46,           # 'RIFF'
    0x24, 0xF0, 0x00, 0x00,           # File size - 8 bytes
    0x57, 0x41, 0x56, 0x45,           # 'WAVE'
    
    # fmt subchunk
    0x66, 0x6D, 0x74, 0x20,           # 'fmt '
    0x10, 0x00, 0x00, 0x00,           # Subchunk1Size (16)
    0x01, 0x00,                       # AudioFormat (1 = PCM)
    0x01, 0x00,                       # NumChannels (1 = mono)
    0x44, 0xAC, 0x00, 0x00,           # SampleRate (44100)
    0x88, 0x58, 0x01, 0x00,           # ByteRate (88200)
    0x02, 0x00,                       # BlockAlign (2)
    0x10, 0x00,                       # BitsPerSample (16)
    
    # data subchunk
    0x64, 0x61, 0x74, 0x61,           # 'data'
    0x00, 0xF0, 0x00, 0x00            # Subchunk2Size (61440 samples)
)

# Add audio data - simple 440Hz sine wave
for($i = 0; $i -lt 61440; $i++) {
    $val = [math]::Sin(2 * [math]::PI * 440 * $i / 44100) * 32767
    $int16 = [int16]$val
    $bytes = [BitConverter]::GetBytes($int16)
    $wavFile += $bytes
}

[System.IO.File]::WriteAllBytes('l:\birthday\music\birthday.wav', $wavFile)
Write-Host "Created birthday.wav - $($wavFile.Length) bytes"
