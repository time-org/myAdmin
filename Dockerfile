FROM alpine:3.15 as builder

RUN apk add --update --no-cache nodejs && wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -

# # 指定工作目录
WORKDIR /app

# COPY ./dist /app/dist
COPY . /app

RUN source $HOME/.shrc &&  pnpm install && pnpm build

FROM nginx:latest
COPY --from=builder /app/dist /app/dist
COPY --from=builder  /app/config/nginx.conf /home/nginx/configs/

# 运行 nginx
CMD ["nginx","-c","/home/nginx/configs/nginx.conf","-g", "daemon off;"]
# 镜像对外暴露端口
EXPOSE 9527

# RUN pnpm install
