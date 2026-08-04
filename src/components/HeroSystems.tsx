import {
  type KeyboardEvent,
  type MutableRefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import './HeroSystems.css'

type GameStatus = 'idle' | 'playing' | 'paused' | 'won' | 'lost'

const PLAYER_BULLETS = 8
const ENEMY_BULLETS = 6
const INVADER_COUNT = 12

function Stars() {
  const positions = useMemo(() => {
    const points = new Float32Array(90 * 3)
    for (let i = 0; i < 90; i += 1) {
      points[i * 3] = (Math.random() - 0.5) * 7
      points[i * 3 + 1] = (Math.random() - 0.5) * 5
      points[i * 3 + 2] = -1 - Math.random() * 2
    }
    return points
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#d7d1c7" size={0.025} transparent opacity={0.42} />
    </points>
  )
}

function Player({ meshRef }: { meshRef: MutableRefObject<THREE.Group | null> }) {
  return (
    <group ref={meshRef} position={[0, -1.62, 0]}>
      <mesh>
        <coneGeometry args={[0.17, 0.52, 3]} />
        <meshStandardMaterial
          color="#ebe6dc"
          emissive="#777169"
          emissiveIntensity={0.45}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[-0.22, -0.13, 0]} rotation={[0, 0, -0.18]}>
        <boxGeometry args={[0.3, 0.08, 0.08]} />
        <meshBasicMaterial color="#7dcfb6" />
      </mesh>
      <mesh position={[0.22, -0.13, 0]} rotation={[0, 0, 0.18]}>
        <boxGeometry args={[0.3, 0.08, 0.08]} />
        <meshBasicMaterial color="#7dcfb6" />
      </mesh>
    </group>
  )
}

function SpaceGame({
  active,
  keys,
  onScore,
  onEnd,
}: {
  active: boolean
  keys: MutableRefObject<Set<string>>
  onScore: () => void
  onEnd: (result: 'won' | 'lost') => void
}) {
  const player = useRef<THREE.Group>(null)
  const invaderGroup = useRef<THREE.Group>(null)
  const invaders = useRef<(THREE.Mesh | null)[]>([])
  const playerBullets = useRef<(THREE.Mesh | null)[]>([])
  const enemyBullets = useRef<(THREE.Mesh | null)[]>([])
  const alive = useRef(Array.from({ length: INVADER_COUNT }, () => true))
  const playerBulletActive = useRef(Array.from({ length: PLAYER_BULLETS }, () => false))
  const enemyBulletActive = useRef(Array.from({ length: ENEMY_BULLETS }, () => false))
  const enemyDirection = useRef(1)
  const lastPlayerShot = useRef(0)
  const lastEnemyShot = useRef(0)
  const ended = useRef(false)

  // Stable callbacks prevent score re-renders from re-hiding active bullets.
  const playerBulletRefs = useMemo(
    () =>
      Array.from({ length: PLAYER_BULLETS }, (_, index) => (node: THREE.Mesh | null) => {
        playerBullets.current[index] = node
        if (node) node.visible = false
      }),
    [],
  )
  const enemyBulletRefs = useMemo(
    () =>
      Array.from({ length: ENEMY_BULLETS }, (_, index) => (node: THREE.Mesh | null) => {
        enemyBullets.current[index] = node
        if (node) node.visible = false
      }),
    [],
  )

  const invaderPositions = useMemo(
    () =>
      Array.from({ length: INVADER_COUNT }, (_, index) => [
        (index % 4) * 0.62 - 0.93,
        Math.floor(index / 4) * -0.52 + 1.36,
        0,
      ] as [number, number, number]),
    [],
  )

  const finish = useCallback(
    (result: 'won' | 'lost') => {
      if (ended.current) return
      ended.current = true
      onEnd(result)
    },
    [onEnd],
  )

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime
    if (!active || ended.current || !player.current || !invaderGroup.current) return

    const pressed = keys.current
    const horizontal =
      (pressed.has('d') || pressed.has('arrowright') ? 1 : 0) -
      (pressed.has('a') || pressed.has('arrowleft') ? 1 : 0)
    const vertical =
      (pressed.has('w') || pressed.has('arrowup') ? 1 : 0) -
      (pressed.has('s') || pressed.has('arrowdown') ? 1 : 0)

    player.current.position.x = THREE.MathUtils.clamp(
      player.current.position.x + horizontal * delta * 2.45,
      -2.25,
      2.25,
    )
    player.current.position.y = THREE.MathUtils.clamp(
      player.current.position.y + vertical * delta * 1.8,
      -1.75,
      -0.82,
    )
    player.current.rotation.z = THREE.MathUtils.lerp(
      player.current.rotation.z,
      -horizontal * 0.2,
      1 - Math.exp(-delta * 10),
    )

    if (t - lastPlayerShot.current > 0.3) {
      const slot = playerBulletActive.current.findIndex((value) => !value)
      const bullet = playerBullets.current[slot]
      if (slot >= 0 && bullet) {
        playerBulletActive.current[slot] = true
        bullet.visible = true
        bullet.position.set(player.current.position.x, player.current.position.y + 0.36, 0)
        lastPlayerShot.current = t
      }
    }

    playerBullets.current.forEach((bullet, bulletIndex) => {
      if (!bullet || !playerBulletActive.current[bulletIndex]) return
      bullet.position.y += delta * 3.8
      if (bullet.position.y > 2.25) {
        playerBulletActive.current[bulletIndex] = false
        bullet.visible = false
        return
      }

      invaders.current.forEach((invader, invaderIndex) => {
        if (!invader || !alive.current[invaderIndex] || !invaderGroup.current) return
        const x = invader.position.x + invaderGroup.current.position.x
        const y = invader.position.y + invaderGroup.current.position.y
        if (Math.abs(bullet.position.x - x) < 0.29 && Math.abs(bullet.position.y - y) < 0.24) {
          alive.current[invaderIndex] = false
          invader.visible = false
          playerBulletActive.current[bulletIndex] = false
          bullet.visible = false
          onScore()
        }
      })
    })

    const group = invaderGroup.current
    group.position.x += enemyDirection.current * delta * 0.25
    if (Math.abs(group.position.x) > 0.88) {
      enemyDirection.current *= -1
      group.position.x = THREE.MathUtils.clamp(group.position.x, -0.88, 0.88)
      group.position.y -= 0.08
    }

    if (alive.current.every((value) => !value)) {
      finish('won')
      return
    }

    const lowestAlive = invaderPositions.reduce((lowest, position, index) => {
      return alive.current[index] ? Math.min(lowest, position[1] + group.position.y) : lowest
    }, Infinity)
    if (lowestAlive < -0.72) {
      finish('lost')
      return
    }

    if (t - lastEnemyShot.current > 1.35) {
      const living = alive.current
        .map((value, index) => (value ? index : -1))
        .filter((index) => index >= 0)
      const shooterIndex = living[Math.floor(Math.random() * living.length)]
      const slot = enemyBulletActive.current.findIndex((value) => !value)
      const bullet = enemyBullets.current[slot]
      const shooter = invaders.current[shooterIndex]
      if (slot >= 0 && bullet && shooter) {
        enemyBulletActive.current[slot] = true
        bullet.visible = true
        bullet.position.set(
          shooter.position.x + group.position.x,
          shooter.position.y + group.position.y - 0.22,
          0,
        )
        lastEnemyShot.current = t
      }
    }

    enemyBullets.current.forEach((bullet, index) => {
      if (!bullet || !enemyBulletActive.current[index] || !player.current) return
      bullet.position.y -= delta * 1.35
      bullet.rotation.z += delta * 4
      if (bullet.position.y < -2.15) {
        enemyBulletActive.current[index] = false
        bullet.visible = false
        return
      }
      if (
        Math.abs(bullet.position.x - player.current.position.x) < 0.2 &&
        Math.abs(bullet.position.y - player.current.position.y) < 0.19
      ) {
        finish('lost')
      }
    })
  })

  return (
    <>
      <Stars />
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 3, 5]} intensity={1.8} color="#fffaf0" />
      <Player meshRef={player} />

      <group ref={invaderGroup}>
        {invaderPositions.map((position, index) => (
          <mesh
            key={index}
            ref={(node) => {
              invaders.current[index] = node
            }}
            position={position}
            rotation={[0, 0, Math.PI / 4]}
          >
            <octahedronGeometry args={[0.17, 0]} />
            <meshStandardMaterial
              color={index % 3 === 1 ? '#7dcfb6' : '#d6d0c6'}
              emissive={index % 3 === 1 ? '#315b50' : '#4c4944'}
              emissiveIntensity={0.55}
              metalness={0.4}
              roughness={0.3}
            />
          </mesh>
        ))}
      </group>

      {Array.from({ length: PLAYER_BULLETS }, (_, index) => (
        <mesh
          key={`player-${index}`}
          ref={playerBulletRefs[index]}
        >
          <capsuleGeometry args={[0.025, 0.12, 4, 8]} />
          <meshBasicMaterial color="#7dcfb6" />
        </mesh>
      ))}

      {Array.from({ length: ENEMY_BULLETS }, (_, index) => (
        <mesh
          key={`enemy-${index}`}
          ref={enemyBulletRefs[index]}
        >
          <boxGeometry args={[0.055, 0.15, 0.055]} />
          <meshBasicMaterial color="#d6d0c6" />
        </mesh>
      ))}
    </>
  )
}

const controlledKeys = new Set([
  'w',
  'a',
  's',
  'd',
  'arrowup',
  'arrowleft',
  'arrowdown',
  'arrowright',
])

export function HeroSystems() {
  const panel = useRef<HTMLDivElement>(null)
  const keys = useRef(new Set<string>())
  const [status, setStatus] = useState<GameStatus>('idle')
  const [score, setScore] = useState(0)
  const [session, setSession] = useState(0)

  const start = () => {
    keys.current.clear()
    setScore(0)
    setSession((value) => value + 1)
    setStatus('playing')
    window.requestAnimationFrame(() => panel.current?.focus())
  }

  const resume = () => {
    setStatus('playing')
    window.requestAnimationFrame(() => panel.current?.focus())
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const key = event.key.toLowerCase()
    if (key === 'escape') {
      setStatus('paused')
      keys.current.clear()
      return
    }
    if (!controlledKeys.has(key)) return
    event.preventDefault()
    keys.current.add(key)
  }

  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    keys.current.delete(event.key.toLowerCase())
  }

  const overlayLabel =
    status === 'won'
      ? 'You cleared the system'
      : status === 'lost'
        ? 'Signal lost'
        : status === 'paused'
          ? 'Paused'
          : 'Click to start'

  return (
    <div
      ref={panel}
      className={`hero-game is-${status}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={() => {
        keys.current.clear()
        if (status === 'playing') setStatus('paused')
      }}
      aria-label="Space Invaders mini game"
    >
      <div className="hero-game__canvas" aria-hidden>
        <Canvas
          orthographic
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 10], zoom: 70 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <SpaceGame
            key={session}
            active={status === 'playing'}
            keys={keys}
            onScore={() => setScore((value) => value + 100)}
            onEnd={(result) => setStatus(result)}
          />
        </Canvas>
      </div>

      <div className="hero-game__hud" aria-live="polite">
        <span>{score.toString().padStart(4, '0')}</span>
        <span className="hero-game__controls">WASD&nbsp;&nbsp;/&nbsp;&nbsp;ARROWS</span>
      </div>

      {status !== 'playing' && (
        <button
          type="button"
          className="hero-game__overlay"
          onClick={status === 'paused' ? resume : start}
        >
          <span className="hero-game__play" aria-hidden>▶</span>
          <strong>{overlayLabel}</strong>
          <small>{status === 'idle' ? 'WASD or arrow keys' : 'Click to continue'}</small>
        </button>
      )}
    </div>
  )
}
