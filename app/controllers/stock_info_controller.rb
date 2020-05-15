class StockInfoController < ApplicationController
  before_filter :authenticate_user, :only => [:stock_time_series]

  def  stock_time_series
    function = params[:function]
    symbol = params[:symbol]
    interval = params[:interval]
    response = Faraday.get('https://www.alphavantage.co/query?function=#{function}&symbol=#{symbol}&interval=#{interval}&apikey=96YHOX0Y72F9P91F')
    result = JSON.parse(response.body)
    render json: result 
end
