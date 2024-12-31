import { hmac } from 'https://denopkg.com/chiefbiiko/hmac/mod.ts';
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.1';

// Add .env file in same directory
const _ = {
    // SUPABASE
    SUPABASE_URL: '',
    SUPABASE_SERVICE_ROLE: '',
    // PADDLE
    WEBHOOK_SECRET: ''
};

const supabase = createClient(_.SUPABASE_URL, _.SUPABASE_SERVICE_ROLE);

serve(async (req: Request) => {
    if (req.method === 'POST') {
        const body = await req.text();
        const sig = req.headers.get('Paddle-Signature') as string;

        const signature = sig.split(';')[1].split('=')[1];
        const timestamp = sig.split(';')[0].split('=')[1];
        const payload = `${timestamp}:${body}`;

        const _hmac = hmac('SHA256', _.WEBHOOK_SECRET, payload, undefined, 'hex');

        if (_hmac === signature) {

            const data = await JSON.parse(body);

            const event_type = data.event_type;

            switch (event_type) {
                case 'customer.created': {
                    const customer_data = data.data;

                    const { data: user, error } = await supabase
                        .from('accounts')
                        .select('*')
                        .eq('email', customer_data.email)
                        .single();

                    if (error) {
                        // const { data: authData, error: authError } = await supabase.auth.admin.createUser({
                        //     email: customer_data.email,
                        //     email_confirm: true
                        // })

                        // const { data: _, error: uError } = await supabase.from("accounts").update({
                        //     'paddle_customer_id': customer_data.id
                        // }).eq('id', authData.user?.id)

                    } else {
                        const { data: _, error: uError } = await supabase
                            .from('accounts')
                            .update({
                                paddle_customer_id: customer_data.id
                            })
                            .eq('id', user.id);
                    }

                    break;
                }
                case 'customer.updated': {
                    // const customer_data = data.data

                    // const { data: user, error } = await supabase.from('accounts').select("*").eq('email', customer_data.email).single()

                    // if (error) {
                    //     const { data: authData, error: authError } = await supabase.auth.admin.createUser({
                    //         email: customer_data.email,
                    //         email_confirm: true
                    //     })

                    //     const { data: _, error: uError } = await supabase.from("accounts").update({
                    //         'paddle_customer_id': customer_data.id
                    //     }).eq('id', authData.user?.id)
                    // } else {
                    //     const { data: _, error: uError } = await supabase.from("accounts").update({
                    //         'paddle_customer_id': customer_data.id
                    //     }).eq('id', user.id)
                    // }

                    // console.log(customer_data);

                    break;
                }
                case 'transaction.paid': {
                    const transaction_data = data.data;

                    const { items, id: txn_id, created_at, custom_data } = transaction_data;
                    const user_id = custom_data.uid;

                    if (items.length > 0) {
                        items.forEach(async (item: any) => {
                            const { data: product, error: prod_err } = await supabase
                                .from('products')
                                .select('id')
                                .eq('paddle_price_id', item.price_id)
                                .single();

                            if (!prod_err) {
                                await supabase.from('purchases').insert({
                                    user_id: user_id,
                                    paddle_transaction_id: txn_id,
                                    created_at: created_at,
                                    product_id: product.id
                                });
                            }
                        });
                    }
                    break;
                }
                default:
                    break;
            }
        }

        return new Response('Valid request', {
            status: 200
        });
    } else {
        return new Response('Invalid request', {
            status: 400
        });
    }
});
