class Api::TransactionsController < ApplicationController

    def create
        
        @transaction = Transaction.new(trans_params)
        # if @transaction.save
        #     @payer = User.find_by(id: params[:transaction][:payer_id])
        #     @recipient = User.find_by(id: params[:transaction][:recipient_id])
        #     if @payer.balance > @transaction.amount && @payer != @recipient
        #         @payer.payer_change(@transaction.amount)
        #         @recipient.recipient_change(@transaction.amount)
        #     else
        #         render json: ['Invalid transaction! Try again.'], status: 418
        #     end
        # end
        @payer = User.find_by(id: params[:transaction][:payer_id])
        @recipient = User.find_by(id: params[:transaction][:recipient_id])
        if @payer.balance < @transaction.amount || @transaction.amount < 1
            render json: ['Invalid transaction! Try again.'], status: 418
        else
            if @transaction.save
                @payer.payer_change(@transaction.amount)
                @recipient.recipient_change(@transaction.amount)
                render '/api/transactions/show'
            elsif !@transaction.amount.is_a? Numeric
                render json: ['Invalid transaction! Amount must be a number.'], status: 422
            elsif @transaction.amount < 1
                render json: ['Invalid transaction! Amount cannot be 0.'], status: 422
            elsif @transaction.body == ''
                render json: ['Invalid transaction! Message cannot be empty.'], status: 422
            elsif @transaction.body.length > 50
                render json: ['Invalid transaction! Message cannot exceed 50 characters.'], status: 422
            elsif !@transaction.amount
                render json: ['Invalid transaction! Payment amount is required.'], status: 422
            else
                render json: ['Invalid transaction! Try again.'], status: 422
            end
        end
    end

    def index
        @transactions = Transaction.all
    end

    def show
        @transaction = Transaction.find(params[:id])
    end

    private
    def trans_params
        params.require(:transaction).permit(:amount, :body, :payer_id, :recipient_id)
    end
end
