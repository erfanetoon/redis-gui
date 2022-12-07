export interface RedisContext {
    path: string;
    connections: Array<string>;
    activeItem: any;
    handleChange: (data: Partial<Omit<RedisContext, "handleChange">>) => void;
}
