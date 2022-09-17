(module
  ;; import memory
  (memory $mem (export "memory") 2)

  ;; config
  (global $blockSize (import "setup" "blockSize") (mut i32))

  ;; k-input, k-gain (single-time or internal call)
  (func $gain00 (param $x i32) (param $gain i32) (param $out i32))

  ;; * channels
  ;; walk by all channels, apply formula
  (func $gain10 (param $n i32) (param $gain f32)
    (local $i i32 $x f32)

    (loop $i
      (block
        ;; iterate over all channels
        (local $c i32 $chOffset i32)
        (loop $ch
          ;; chOffset = blockSize * c
          (local.set $chOffset (i32.mul (global.get $blockSize) (local.get $c))

          ;; x = input[chOffset + i]
          (local.set $x (f32.load (i32.add (local.get $i) (local.get $chOffset))))

          ;; x = x * gain
          (local.set $x (f32.mul (local.get $x) (local.get $gain)))

          ;; input[chOffset + i] = x * gain
          (f32.store (local.get $i) (local.get $x))

          ;; c++
          (local.set $c (i32.add (local.get $c) (i32.const 1)))

          (br_if $ch (i32.lt_s (local.get $c) (global.get $n)))
        )
        (br_if $i (i32.lt_s (local.get $i) (global.get $blockSize)))
      )

      ;; i++
      (local.set $i (i32.add (local.get $i) (i32.const 4)))
      ;; until i < blockSize
      (br_if $i (i32.lt_s (local.get $i) (global.get $blockSize)))
    )
  )

  ;; mono k-rate
  (func $gain1k ()
    (param $l $r f32) (param $amp f32)
    (local $i i32) (local $x f32)

    (loop $gain
      ;; x = input[i]
      (local.set $x (f32.load (local.get $i)))

      ;; x = x * amp
      ;; (local.set $x (f32.mul (local.get $x) (local.get $amp)))
      ;; {{ son function body }}

      ;; input[i] = x * amp
      (f32.store (local.get $i) (local.get $x))

      ;; i++
      (local.set $i (i32.add (local.get $i) (i32.const 4)))

      ;; if (i < len) repeat
      (br_if $gain (i32.lt_s (local.get $i) (global.get $blockSize)))
    )
  )

  ;; mono a-rate
  (func $gain1a)

  ;; stereo
  (func $gain2k ()

  )
)
