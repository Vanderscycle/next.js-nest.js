# Welcome to Tilt!
#   To get you started as quickly as possible, we have created a
#   starter Tiltfile for you.
#
#   Uncomment, modify, and delete any commands as needed for your
#   project's configuration.


# Output diagnostic messages
#   You can print log messages, warnings, and fatal errors, which will
#   appear in the (Tiltfile) resource in the web UI. Tiltfiles support
#   multiline strings and common string operations such as formatting.
#
#   More info: https://docs.tilt.dev/api.html#api.warn
# print("""
# -----------------------------------------------------------------
# ✨ Hello Tilt! This appears in the (Tiltfile) pane whenever Tilt
#    evaluates this file.
# -----------------------------------------------------------------
# """.strip())
# warn('ℹ️ Open {tiltfile_path} in your favorite editor to get started.'.format(
#     tiltfile_path=config.main_path))

# Variables
sync_src_frontend= sync('./frontend', '/src')
sync_src_backend= sync('./backend', '/src')

# Build Docker image
#   Tilt will automatically associate image builds with the resource(s)
#   that reference them (e.g. via Kubernetes or Docker Compose YAML).
#
#   More info: https://docs.tilt.dev/api.html#api.docker_build
#

docker_build('localhost:5005/frontend-nextjs', context='./frontend', dockerfile='./frontend/Dockerfile', live_update=[sync_src_frontend] )
docker_build('localhost:5005/backend-nestjs',context='./backend',dockerfile='./backend/Dockerfile', live_update=[sync_src_backend])

# Extensions are open-source, pre-packaged functions that extend Tilt
#
#   More info: https://github.com/tilt-dev/tilt-extensions
#
load('ext://helm_remote', 'helm_remote')
#WARN: only localhost works
#TODO: add the tests
modes = ['localhost', 'infrastructure'] 
selection = modes[0]

def localhost():

  #variables
  update_settings(suppress_unused_image_warnings=["localhost:5005/frontend-nextjs"])
  update_settings(suppress_unused_image_warnings=["localhost:5005/backend-nestjs"])
  
  # Local ressources
  local_resource('localhost-backend',
  resource_deps=['localhost-postgres'],
   # cmd='pnpm run start:dev', #WARN: otherwise it nevers refresh
   # dir='./backend',
   serve_cmd='cd ./backend && pnpm run start:dev',
   deps='./backend/src'
   )
  local_resource('localhost-frontend',
  resource_deps=['localhost-postgres'],
   # cmd='pnpm i',
   # dir='./frontend',
   serve_cmd='cd ./frontend && pnpm run dev',
   deps='./frontend/pages'
   )

  local_resource('localhost-postgres',
   cmd='make dev-db',
   )
  # helm_remote('postgresql',
  #   repo_name='bitnami',
  #   set=['auth.postgresPassword=secretpassword'],
  #   repo_url='https://charts.bitnami.com/bitnami')

  return

def testing():
  #TODO: raise a ticket to ask how to only have failed when bad test
  # Local resources
  local_resource('localhost-testing-backend',
  resource_deps=['localhost-postgres'],
   serve_cmd='cd ./backend && pnpm run test:cov',
   deps='./backend/dist/**/*.spec.js'
   )
  local_resource('localhost-testing-frontend',
  resource_deps=['localhost-postgres'],
   serve_cmd='cd ./frontend && pnpm run cypress:run',
   deps=['./frontend/e2e/**/*.{cy,spec}.js']

   )

def infrastructure():
  # Apply Kubernetes manifests
  #   Tilt will build & push any necessary images, re-deploying your
  #   resources as they change.
  #
  #   More info: https://docs.tilt.dev/api.html#api.k8s_yaml
  k8s_fullstack="./infrastructure/overlays/non-prod"
  k8s_yaml([kustomize(k8s_fullstack)])

# Customize a Kubernetes resource
#   By default, Kubernetes resource names are automatically assigned
#   based on objects in the YAML manifests, e.g. Deployment name.
#
#   Tilt strives for sane defaults, so calling k8s_resource is
#   optional, and you only need to pass the arguments you want to
#   override.
#
#   More info: https://docs.tilt.dev/api.html#api.k8s_resource
#
  k8s_resource('nextjs',labels="frontend",port_forwards='3000:3000')
  k8s_resource('pgadmin',labels="backend",port_forwards='8000:80')
  k8s_resource('nestjs',labels="backend",port_forwards='5000:3001',resource_deps=['postgres'])
  k8s_resource('postgres',labels="db",port_forwards='5433:5432')
            
if selection == modes[0]:
  localhost()
  testing()

if selection == modes[1]:
  infrastructure()




# Run local commands
#   Local commands can be helpful for one-time tasks like installing
#   project prerequisites. They can also manage long-lived processes
#   for non-containerized services or dependencies.
#
#   More info: https://docs.tilt.dev/local_resource.html
#
# local_resource('install-helm',
#                cmd='which helm > /dev/null || brew install helm',
#                # `cmd_bat`, when present, is used instead of `cmd` on Windows.
#                cmd_bat=[
#                    'powershell.exe',
#                    '-Noninteractive',
#                    '-Command',
#                    '& {if (!(Get-Command helm -ErrorAction SilentlyContinue)) {scoop install helm}}'
#                ]
# )



# load('ext://git_resource', 'git_checkout')


# Organize logic into functions
#   Tiltfiles are written in Starlark, a Python-inspired language, so
#   you can use functions, conditionals, loops, and more.
#
#   More info: https://docs.tilt.dev/tiltfile_concepts.html
#
# def tilt_demo():
#     # Tilt provides many useful portable built-ins
#     # https://docs.tilt.dev/api.html#modules.os.path.exists
#     if os.path.exists('tilt-avatars/Tiltfile'):
#         # It's possible to load other Tiltfiles to further organize
#         # your logic in large projects
#         # https://docs.tilt.dev/multiple_repos.html
#         load_dynamic('tilt-avatars/Tiltfile')
#     watch_file('tilt-avatars/Tiltfile')
#     git_checkout('https://github.com/tilt-dev/tilt-avatars.git',
#                  checkout_dir='tilt-avatars')


# Edit your Tiltfile without restarting Tilt
#   While running `tilt up`, Tilt watches the Tiltfile on disk and
#   automatically re-evaluates it on change.
#
#   To see it in action, try uncommenting the following line with
#   Tilt running.
# tilt_demo()
